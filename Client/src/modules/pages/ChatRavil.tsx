import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr"
import {URL} from "../shared/request"
import {FormInput} from "../shared/utils/FormInput"
import {useAuth} from "../hooks/auth.hook";
import jwt from "jsonwebtoken";
import {Token} from "../shared/interface";
import {useHttp} from "../hooks/http.hook";

export const ChatRavil = () => {
    const a = useAuth().token
    const decoded = jwt.decode(a! as string)
    const tokenItems = decoded as Token
    const [username, setUsername] = useState("")
    const [hubConnection, setHubConnection] = useState<HubConnection>()
    const [something, setSomething] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    const submit = async (event: any) => {
        event.preventDefault()
        setSomething('')
        await hubConnection!.send('newMessage', tokenItems.name, something)
    }

    useEffect(() => {
        setUsername(tokenItems?.name ?? "")
        const createHubConnection = async () => {
            const hubConnect = new HubConnectionBuilder()
                .withUrl(URL + 'api/chat')
                .build()
            try {
                await hubConnect.start()
                console.log('Connection successful!')
                hubConnect.on('messageReceived',
                    (username: string, message: string) => {
                        setMessages(x => [...x, message])
                    })
                await hubConnect.send('getAll')
            } catch (err) {
                console.log(err)
            }
            setHubConnection(hubConnect)
        }
        createHubConnection()
    }, [])

    return (
        <main className="page">
            <div className="container">
                <form onSubmit={submit}>
                    <div className="card-body">
                        {messages && messages.map((m, i) => {
                            return (
                                <div className="card" key={`${m}-${i}`}>{m}</div>
                            )
                        })}
                    </div>
                    <FormInput onChange={(event) => {
                        setSomething(event.target.value)
                    }}
                               name={'message'} formValue={something}/>
                    <button>send</button>
                </form>
            </div>
        </main>
    )
}
