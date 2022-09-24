
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Input } from 'antd'

const { TextArea } = Input

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            setTimeout(createWSChannel, 3000)
        }

        function createWSChannel() {
            // if (ws !== null) {
                ws?.removeEventListener('close', closeHandler)
                ws?.close()
            // }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createWSChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessagesForm wsChannel={wsChannel} />
        </div>
    )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect( () => {
        let messageHandler = (event: MessageEvent) => {
            let newMessages = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map( (m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const AddMessagesForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [message, setMessages] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect( () => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessages('')
    }

    return (
        <div>
            <div>
                <TextArea placeholder={'write messages'}
                          onChange={(e) => setMessages(e.currentTarget.value)}
                          value={message}
                ></TextArea>
            </div>
            <div>
                <Button onClick={sendMessage}
                        disabled={wsChannel === null || readyStatus !== 'ready'}
                >send</Button>
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