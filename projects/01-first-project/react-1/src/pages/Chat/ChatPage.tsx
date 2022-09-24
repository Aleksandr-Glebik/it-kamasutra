
import React from 'react'
import { Button } from 'antd'
import { Input } from 'antd'

const { TextArea } = Input

// type PropsType = {

// }

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
    const messages = [1, 2, 3, 4]
    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map( (m: any) => <Message />)}
            {messages.map( (m: any) => <Message />)}
            {messages.map( (m: any) => <Message />)}
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

const Message: React.FC = () => {
    const message = {
        url: 'https://via.placeholder.com/50',
        author: 'Sasha',
        text: 'Hello friends'
    }
    return (
        <div>
            <img src={message.url}/>
            <b>{message.author}</b>
            <br/>
            {message.text}
            <hr />
        </div>
    )
}

export default ChatPage