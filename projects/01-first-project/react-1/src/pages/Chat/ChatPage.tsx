
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Input } from 'antd'

const { TextArea } = Input

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType =  {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessagesForm />
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect( () => {
        wsChannel.addEventListener('message', (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data)
            // setMessages([...messages, ...newMessages])
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map( (m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const AddMessagesForm: React.FC = () => {
    return (
        // <div style={{maxWidth: '600px'}}>
        <div>
            <div>
                <TextArea placeholder={'write messages'} ></TextArea>
            </div>
            <div>
                <Button>send</Button>
            </div>
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '45px'}}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr />
        </div>
    )
}

export default ChatPage