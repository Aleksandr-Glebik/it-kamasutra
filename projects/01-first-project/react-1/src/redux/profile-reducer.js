import { usersAPI, profileAPI } from '../api/api';
import { stopSubmit } from "redux-form"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', countLike: '20'},
        {id: 2, message: 'Fine, and You?', countLike: '15'},
        {id: 3, message: 'Me too', countLike: ''},
    ],
    profile: null,
    status: "",
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => {
    return {
      type: ADD_POST,
      newPostText
    }
}

export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
}

export const setStatus = (status) => {
    return {type: SET_STATUS, status}
}
export const deletePost = (postId) => {
    return {type: DELETE_POST, postId}
}
export const savePhotoSuccess = (photos) => {
    return {type: SAVE_PHOTO_SUCCESS, photos}
}

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch(error) {
        console.log('error', error)
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}))
        return Promise.reject( response.data.messages[0])
    }
}

export default profileReducer;