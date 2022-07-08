import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required, maxLengthCreator  } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
// import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { Navigate } from 'react-router-dom'
import styles from '../Common/FormsControls/FormsControls.module.css'

const maxLength30 = maxLengthCreator(30)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={"email"} component={Input}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field placeholder={'Password'} name={"password"} component={Input}
                    type={"password"}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field type={'checkbox'} name={"rememberMe"} component={Input} /> remember me
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
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
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to="/profile/24457"/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login
})(Login);