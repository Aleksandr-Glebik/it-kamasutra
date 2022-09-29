import React from 'react'
import Profile from './Profile.tsx';
import { connect } from 'react-redux';
import { getUserProfile, updateStatus, getStatus, savePhoto, saveProfile } from '../../redux/profile-reducer.ts'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {withAuthRedirect} from '../../hoc/withAuthRedirect.tsx'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types.ts'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => void
}

type PropsType = MapPropsType & DispatchPropsType
class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
      let userId: number | null = +this.props.router.params.userId;
      if (!userId) {
        userId = this.props.authorizedUserId
      }
      if (!userId) {
        console.error(`ID should exists in URI params or in state <authorizedUserId>`)
      } else {
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
      }
    }

    componentDidMount() {
      this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
      if (this.props.router.params.userId != prevProps.router.params.userId) {
        this.refreshProfile()
      }
    }

    render () {
      return (
        <div>
          <Profile {...this.props}
            isOwner={!this.props.router.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile}
            />
        </div>
      )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()

    return (
      <Component {...props} router={{location, navigate, params}} />
    )
  }

  return ComponentWithRouterProp
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);

