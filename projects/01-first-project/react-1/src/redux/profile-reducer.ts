import { BaseThunkType, InferActionsTypes } from './redux-store';
// import { usersAPI, profileAPI } from '../api/api.ts';
import { profileAPI } from '../api/profile-api.ts';
// import { usersAPI } from '../api/users-api.ts';
import { FormAction, stopSubmit } from "redux-form"
import {PostDataType, PhotosType, ProfileType} from '../types/types'

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', countLike: 20},
        {id: 2, message: 'Fine, and You?', countLike: 15},
        {id: 3, message: 'Me too', countLike: 0},
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                countLike: 0,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',
            }
        }
        case 'SN/PROFILE/SET-STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }
        case 'SN/PROFILE/SET-USER-PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SN/PROFILE/DELETE-POST': {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }
        case 'SN/PROFILE/SAVE-PHOTO-SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({
          type: 'SN/PROFILE/ADD-POST',
          newPostText
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'SN/PROFILE/SET-USER-PROFILE', profile
    } as const),
    setStatus: (status: string) => ({
        type: 'SN/PROFILE/SET-STATUS', status
    } as const),
    deletePost: (postId: number) => ({
        type: 'SN/PROFILE/DELETE-POST', postId
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SAVE-PHOTO-SUCCESS', photos
    } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch(error) {
        console.log('error', error)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can not be null')
        }

    } else {
        dispatch(stopSubmit("editProfile", {_error: data.messages[0]}))
        return Promise.reject( data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>