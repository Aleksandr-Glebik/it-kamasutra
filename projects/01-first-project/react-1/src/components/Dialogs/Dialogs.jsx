import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogsData.map( (dialog) => {
        return <DialogItem name={dialog.name} id={dialog.id} />
    })

    let messagesElements = props.state.messagesData.map( (message) => {
        return <Message message={message.message} />
    })

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={styles.messages}>
                { messagesElements }
            </div>
        </div>
    )
}

export default Dialogs;
