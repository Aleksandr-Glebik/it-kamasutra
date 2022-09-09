import { BaseThunkType, InferActionsTypes } from './redux-store';
import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum, ResultCodeForCaptchaEnum } from "../api/api.ts"
import {  securityAPI } from "../api/security-api.ts"
import { authAPI } from "../api/auth-api.ts"

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType  => {

    switch (action.type) {
        case 'SN/AUTH/SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'SN/AUTH/GET-CAPTCHA-URL-SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
      type: 'SN/AUTH/SET-USER-DATA',
      payload: {
        id: id,
        email: email,
        login: login,
        isAuth: isAuth,
      }
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
      type: 'SN/AUTH/GET-CAPTCHA-URL-SUCCESS',
      payload: {
        captchaUrl: captchaUrl
      }
  } as const),
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success) {
      let {id, email, login} = meData.data
      dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string ): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
      // success, get auth data
      dispatch(getAuthUserData())
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CapchaIsRequierd) {
        dispatch(getCaptchaUrl())
      }
      let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Common error'
      dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>