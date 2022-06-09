const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', countLike: '20'},
        {id: 2, message: 'Fine, and You?', countLike: '15'},
        {id: 3, message: 'Me too', countLike: ''},
    ],
    newPostText: 'it-kamasutra.com'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                countLike: 0,
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',


            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        default:
            return state
    }
}

export const addPostActionCreator = () => {
    return {
      type: ADD_POST
    }
}

export const updateNewPostText = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text,}
}

export default profileReducer;