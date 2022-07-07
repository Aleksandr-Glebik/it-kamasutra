import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required, maxLengthCreator  } from '../../utils/validators/validators';

const maxLength15 = maxLengthCreator(15)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={"login"} component={Input}
                    validate={[required, maxLength15]}
                />
            </div>
            <div>
                <Field placeholder={'Password'} name={"password"} component={Input}
                    validate={[required, maxLength15]}
                />
            </div>
            <div>
                <Field type={'checkbox'} name={"rememberMe"} component={Input} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log('formData', formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;