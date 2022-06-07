import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/state'

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage

    let dialogsElements = state.dialogsData.map( (dialog) => {
        return <DialogItem name={dialog.name} id={dialog.id} />
    })

    let messagesElements = state.messagesData.map( (message) => {
        return <Message message={message.message} />
    })

    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (event) => {
        let body =  event.target.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
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
                <div>
                    <div>
                        <textarea value={ newMessageBody }
                                  onChange={ onNewMessageChange }
                                  placeholder='Enter your message'/>
                    </div>
                    <div>
                        <button onClick={ onSendMessageClick }>
                          Send
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dialogs;
