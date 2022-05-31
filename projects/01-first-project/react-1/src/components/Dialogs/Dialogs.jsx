import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Pasha'},
        {id: 3, name: 'Masha'},
        {id: 4, name: 'Natasha'},
        {id: 5, name: 'Dasha'}
    ]

    let messagesData = [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello, my friend'},
        {id: 3, message: 'I am not your friend'},
        {id: 4, message: 'Why?'},
        {id: 5, message: 'Because you do not know how to react'},
        {id: 6, message: 'BUT I AM LEARNING'},
        {id: 7, message: 'Good, now you are my friend!!!'},
    ]

    let dialogsElements = dialogsData.map( (dialog) => {
        return <DialogItem name={dialog.name} id={dialog.id} />
    })

    let messagesElements = messagesData.map( (message) => {
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
