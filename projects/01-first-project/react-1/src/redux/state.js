import { renderEntireTree } from "../render"

let state = {
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
}

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        countLike: 0,
    }

    state.profilePage.postsData.push(newPost)
    state.profilePage.newPostText = ''
    renderEntireTree(state)
}
export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    renderEntireTree(state)
}

export default state;