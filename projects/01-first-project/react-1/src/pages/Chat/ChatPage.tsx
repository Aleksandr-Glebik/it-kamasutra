
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { Input } from 'antd'
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

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: '45px'}}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr />
        </div>
    )
})

export default ChatPage