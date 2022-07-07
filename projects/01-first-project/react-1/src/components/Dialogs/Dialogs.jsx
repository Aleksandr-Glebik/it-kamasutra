import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Navigate } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls'
import { required, maxLengthCreator  } from '../../utils/validators/validators';

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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const addMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                validate={[required, maxLength50]}
                 name='newMessageBody' placeholder='Enter your message'/>
            </div>
            <div>
                <button>
                    Send
                </button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(addMessageForm)

export default Dialogs;
