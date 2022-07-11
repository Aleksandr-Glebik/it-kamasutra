import { usersAPI, profileAPI } from '../api/api';
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'

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

export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
    });
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
    });
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }

    });
}

export default profileReducer;