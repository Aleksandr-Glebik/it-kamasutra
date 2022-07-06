const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogsData: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Pasha'},
        {id: 3, name: 'Masha'},
        {id: 4, name: 'Natasha'},
        {id: 5, name: 'Dasha'},
    ],
    messagesData: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello, my friend'},
        {id: 3, message: 'I am not your friend'},
        {id: 4, message: 'Why?'},
        {id: 5, message: 'Because you do not know how to react'},
        {id: 6, message: 'BUT I AM LEARNING'},
        {id: 7, message: 'Good, now you are my friend!!!'},
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body =  action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 8, message: body}]
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => {
    return {type: SEND_MESSAGE, newMessageBody}
}

export default dialogsReducer;