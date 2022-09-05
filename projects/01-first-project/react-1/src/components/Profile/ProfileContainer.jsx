import React from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, updateStatus, getStatus, savePhoto, saveProfile } from '../../redux/profile-reducer.ts'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
class ProfileContainer extends React.Component {

    refreshProfile() {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = this.props.authorizedUserId
      }
      this.props.getUserProfile(userId)
      this.props.getStatus(userId)
    }

    componentDidMount() {
      this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => ({
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

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);

