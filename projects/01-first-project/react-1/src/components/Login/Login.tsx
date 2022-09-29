import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls.tsx';
import { required, maxLengthCreator  } from '../../utils/validators/validators.ts';
import { useDispatch, useSelector } from 'react-redux';
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


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC = () => {
    const captchaUrl = useSelector( (state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector( (state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to="/profile/24457"/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

export default Login
