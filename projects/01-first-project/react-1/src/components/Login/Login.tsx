import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls.tsx';
import { required, maxLengthCreator  } from '../../utils/validators/validators.ts';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer.ts';
import { Navigate } from 'react-router-dom'
import styles from '../Common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store.tsx'

const maxLength30 = maxLengthCreator(30)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

// type LoginFormValuesTypesKeys = keyof LoginFormValuesType

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        // console.log('formData', formData);
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    login
})(Login);