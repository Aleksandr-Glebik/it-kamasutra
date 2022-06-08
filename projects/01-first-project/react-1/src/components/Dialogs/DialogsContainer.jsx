import React from 'react'
import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import StoreContext from '../../storeContext'

const DialogsContainer = () => {
    return <StoreContext.Consumer>
        { store => {
            // let state = store.getState().dialogsPage
            let onSendMessageClick = () => {
                store.dispatch(sendMessageCreator())
            }
            let onNewMessageChange = (body) => {
                store.dispatch(updateNewMessageBodyCreator(body))
            }

            return <Dialogs updateNewMessageBody={onNewMessageChange}
                     onSendMessage={onSendMessageClick}
                     dialogsPage={store.getState().dialogsPage} />
        }
    }
    </StoreContext.Consumer>
}

export default DialogsContainer;
