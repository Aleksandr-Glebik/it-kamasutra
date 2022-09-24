import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from './profile-reducer.ts'
import dialogsReducer from './dialogs-reducer.ts'
import sidebarReducer from './sidebar-reducer.ts'
import usersReducer from './users-reducer.ts'
import authReducer from './auth-reducer.ts'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer.ts'
import { ThunkAction } from 'redux-thunk'
import chatReducer from './chat-reducer.ts'

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// window.store = store

export default store