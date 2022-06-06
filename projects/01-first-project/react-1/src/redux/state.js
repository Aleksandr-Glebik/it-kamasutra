const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hi, how are you?', countLike: '20'},
                {id: 2, message: 'Fine, and You?', countLike: '15'},
                {id: 3, message: 'Me too', countLike: ''},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Pasha'},
                {id: 3, name: 'Masha'},
                {id: 4, name: 'Natasha'},
                {id: 5, name: 'Dasha'}
            ],
            messagesData: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: 'Hello, my friend'},
                {id: 3, message: 'I am not your friend'},
                {id: 4, message: 'Why?'},
                {id: 5, message: 'Because you do not know how to react'},
                {id: 6, message: 'BUT I AM LEARNING'},
                {id: 7, message: 'Good, now you are my friend!!!'},
            ],
        },
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                countLike: 0,
            }

            this._state.profilePage.postsData.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    },

}

export const addPostActionCreator = () => {
    return {
      type: ADD_POST
    }
}

export const updateNewPostText = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text,}
}

window.store = store
export default store;