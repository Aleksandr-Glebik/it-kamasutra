import { authAPI } from "../api/api"
const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
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

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
    .then(response => {
          if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
          }
      });
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
    .then(response => {
          if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
          }
      });
}
export const logout = () => (dispatch) => {
    authAPI.logout()
    .then(response => {
          if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
          }
      });
}

export default authReducer;