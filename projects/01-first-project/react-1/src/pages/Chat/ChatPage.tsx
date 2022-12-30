
import React, { useEffect, useRef, useState } from 'react'
import { Button, Avatar, Typography, Input, Alert } from 'antd'
import { ChatMessageType } from '../../api/chat-api.ts'
import { useDispatch, useSelector } from 'react-redux'
import { startMessagesListening, stopMessagesListening, sendMessage } from '../../redux/chat-reducer.ts'
import { AppStateType } from '../../redux/redux-store.ts'

const { TextArea } = Input

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const status = useSelector( (state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh the page</div>}
            { <>
                <Messages />
                <AddMessagesForm />
              </>
            }
        </div>
    )
}

const Messages: React.FC<{}> = ({}) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const el = e.currentTarget
        if (Math.abs( (el.scrollHeight - el.scrollTop) - el.clientHeight) < 300 ) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }


    useEffect( () => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map( (m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const AddMessagesForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const status = useSelector( (state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <TextArea placeholder={'write messages'}
                          onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}
                ></TextArea>
            </div>
            <div>
                <Button onClick={sendMessageHandler}
                        disabled={status !== 'ready'}
                >send</Button>
            </div>
        </div>
    )
}

const { Title } = Typography;

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
        <div style={{width: '50%', margin: '1.5rem 0.5rem', border: '1px solid green', borderRadius: '1rem', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '0.5rem'}}>
                <Avatar.Group style={{marginRight: '0.5rem'}}>
                    <Avatar src={message.photo} style={{width: '55px', height: '55px'}} />
                </Avatar.Group>
                <Title level={4}>{message.userName}</Title>
            </div>
            <Alert message={message.message} type="success" />
        </div>
    )
})

export default ChatPage