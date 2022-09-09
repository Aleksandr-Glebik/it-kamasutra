// import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/dialogs-reducer.ts'
import Dialogs from './Dialogs'
// import { Navigate } from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessage: (newMessageBody) => {
            dispatch(actions.sendMessageCreator(newMessageBody))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
