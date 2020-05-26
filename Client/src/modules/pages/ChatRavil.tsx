import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr"
import {URL} from "../shared/request"
import {FormInput} from "../shared/utils/FormInput"

export const ChatRavil = () => {

    const username = 'Ravil'
    const [hubConnection, setHubConnection] = useState<HubConnection>()
    const [something, setSomething] = useState('')
    const [messages, setMessages] = useState<string[]>(['dasdas', 'dasdas'])
    const submit = async (event: any) => {
        event.preventDefault()
        setSomething('')
        await hubConnection!.send('newMessage', username, something)
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
                        setMessages(x => [...x, message])
                    })
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
