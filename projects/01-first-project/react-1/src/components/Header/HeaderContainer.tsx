import React from 'react'
import Header, {MapPropsType, DispatchPropsType} from './Header.tsx';
import { connect } from 'react-redux';
// import {getAuthUserData, logout} from '../../redux/auth-reducer'
import {logout} from '../../redux/auth-reducer.ts'
import {AppStateType} from '../../types/types.ts'

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
      return (
        <Header {...this.props} />
      )
    }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);