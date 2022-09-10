import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import AddMessageForm from './AddMessageForm/AddMessageForm.tsx'
import {InitialStateType} from '../../redux/dialogs-reducer.ts'

type  PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map( (dialog) => {
        return <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    })

    let messagesElements = state.messagesData.map( (message) => {
        return <Message message={message.message} key={message.id} />
    })

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
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
