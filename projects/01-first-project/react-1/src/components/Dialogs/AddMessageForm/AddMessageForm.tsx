import React from "react"
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../../Common/FormsControls/FormsControls.tsx'
import { required, maxLengthCreator  } from '../../../utils/validators/validators.ts'
import {NewMessageFormType} from '../Dialogs'

const maxLength50 = maxLengthCreator(50)

// type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>

type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> &PropsType> = (props) => {
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

export default reduxForm<NewMessageFormType>({
    form: 'dialog-add-message-form'
})(AddMessageForm)