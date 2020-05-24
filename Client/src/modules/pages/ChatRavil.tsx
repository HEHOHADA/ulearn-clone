import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr"
import {URL} from "../shared/request"
import {FormInput} from "../shared/utils/FormInput"

export const ChatRavil = () => {
    const username = 'Ravil'
    const [hubConnection, setHubConnection] = useState<HubConnection>()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const submit = (event: any) => {
        event.preventDefault()
        hubConnection!.send('newMessage', username, message)
    }

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new HubConnectionBuilder()
                .withUrl(URL + 'api/chat')
                .build()
            try {
                await hubConnect.start()
                console.log('Connection successful!')
                hubConnect.on('messageRecieved',
                    (username: string, message: string) => {
                        const newMessages = messages
                        newMessages.push(message)
                        setMessages(newMessages)
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
                    <FormInput onChange={(event) => setMessage(event.target.value)
                    } name={'message'} formValue={message}/>
                    <button>send</button>
                </form>
            </div>
        </main>
    )
}
