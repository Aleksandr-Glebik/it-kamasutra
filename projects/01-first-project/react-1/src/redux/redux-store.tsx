import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer from './profile-reducer.ts'
import dialogsReducer from './dialogs-reducer.ts'
import sidebarReducer from './sidebar-reducer.ts'
import usersReducer from './users-reducer.ts'
import authReducer from './auth-reducer.ts'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer.ts'

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// window.store = store

export default store