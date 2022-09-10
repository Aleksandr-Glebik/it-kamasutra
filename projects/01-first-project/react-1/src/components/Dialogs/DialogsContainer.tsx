import { connect } from 'react-redux'
import { actions } from '../../redux/dialogs-reducer.ts'
import Dialogs from './Dialogs.tsx'
import {withAuthRedirect} from '../../hoc/withAuthRedirect.tsx'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store.ts'

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
    withAuthRedirect
)(Dialogs);
