import { AppStateType, InferActionsTypes } from './redux-store'
// import { usersAPI } from '../api/api.ts'
import { usersAPI } from '../api/users-api.ts'
import {updateObjectInArray} from '../utils/object-helpers'
import { PhotosType, UserType } from '../types/types'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of user is
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
     followSuccess: (userId: number) => {
        return {
          type: 'FOLLOW',
          userId
        } as const
    },

    unfollowSuccess: (userId: number) => {
        return {
          type: 'UNFOLLOW',
          userId
        } as const
    },

    setUsers: (users: Array<UserType>) => {
        return {
            type: 'SET_USERS',
            users
        } as const
    },

    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage
        } as const
    },

    setTotalUsersCount: (totalUsersCount: number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            totalUsersCount
        } as const
    },

    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: 'TOGGLE_IS_FETCHING',
            isFetching
        } as const
    },

    toggleFollowingProgress: (isFetching: boolean, userId: number)  => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const
    }
}



type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))

        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

type ActionCreatorFUFlow = (userId) => ActionTypes

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: ActionCreatorFUFlow) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
        if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = actions.followSuccess
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = actions.unfollowSuccess
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export default usersReducer;