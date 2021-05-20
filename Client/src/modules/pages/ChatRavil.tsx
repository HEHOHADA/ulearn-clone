import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr"
import {URL} from "../shared/request"
import {FormInput} from "../shared/utils/FormInput"
import {useAuth} from "../hooks/auth.hook";
import jwt from "jsonwebtoken";
import {Token} from "../shared/interface";

interface IMessage {
    username: string
    message: string
}

export const ChatRavil = () => {
    const a = useAuth().token
    const decoded = jwt.decode(a! as string)
    const tokenItems = decoded as Token
    const [hubConnection, setHubConnection] = useState<HubConnection>()
    const [something, setSomething] = useState('')
    const [messages, setMessages] = useState<Array<IMessage>>([])

    const submit = async (event: any) => {
        event.preventDefault()
        setSomething('')
        await hubConnection!.send('newMessage', tokenItems && tokenItems.name ? tokenItems.name
            :
            "Anonymous", something
        )
    }

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new HubConnectionBuilder()
                .withUrl(URL + 'api/chat')
                .build()
            try {
                await hubConnect.start()
                console.log('Connection successful!')
                hubConnect.on('messageReceived',
                    (username: string, message: string) => {
                        setMessages(x => [...x, {username, message}])

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
                                <div className="card" key={`${m}-${i}`}>
                                    <div className="card-body alert-dark">
                                        <strong className="m-1">{m.username}:</strong>
                                        <span className="m-1">{m.message}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <FormInput onChange={(event) => {
                        setSomething(event.target.value)
                    }}
                               name={'message'} formValue={something}/>
                    <button className="btn btn-primary m-1">Send message</button>
                </form>
            </div>
        </main>
    )
}
