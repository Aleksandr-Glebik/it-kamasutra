import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Navigate } from 'react-router-dom'
import AddMessageForm from './AddMessageForm/AddMessageForm'

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map( (dialog) => {
        return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    })

    let messagesElements = state.messagesData.map( (message) => {
        return <Message message={message.message} key={message.id} />
    })

    let newMessageBody = state.newMessageBody

    let addNewMessage = (values) => {
        props.onSendMessage(values.newMessageBody)
    }

    if (!props.isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={styles.messages}>
                <div>
                 { messagesElements }
                </div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;
