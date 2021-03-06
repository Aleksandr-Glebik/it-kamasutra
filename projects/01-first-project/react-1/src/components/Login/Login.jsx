import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls';
import { required, maxLengthCreator  } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom'
import styles from '../Common/FormsControls/FormsControls.module.css'

const maxLength30 = maxLengthCreator(30)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
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
            {captchaUrl &&
                <img src={captchaUrl} />
            }
            {captchaUrl &&
                <Field placeholder={'captcha'} name={"captcha"} component={Input}
                validate={[required]}
                />
            }

            {error && <div className={styles.formSummaryError}>
                {error}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to="/profile/24457"/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login
})(Login);