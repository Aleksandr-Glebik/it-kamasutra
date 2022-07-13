import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const setAuthUserData = (id, email, login, isAuth) => {
    return {
      type: SET_USER_DATA,
      payload: {
        id: id,
        email: email,
        login: login,
        isAuth: isAuth,
      }
    }
}

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: {
        captchaUrl: captchaUrl}
    }
}

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
      let {id, email, login} = response.data.data
      dispatch(setAuthUserData(id, email, login, true))
    }

}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
      // success, get auth data
      dispatch(getAuthUserData())
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Common error'
      dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;