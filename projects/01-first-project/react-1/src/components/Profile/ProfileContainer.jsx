import React from 'react'
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Navigate } from 'react-router-dom'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
class ProfileContainer extends React.Component {

    componentDidMount() {
      let userId = this.props.router.params.userId;
      if (!userId) {
        userId = 2
      }
      this.props.getUserProfile(userId)
    }

    render () {
      return (
        <div>
          <Profile {...this.props} profile={this.props.profile}/>
        </div>
      )
    }
}

// compose(
//   connect(mapStateToProps, {getUserProfile}),
//   withRouter,
//   withAuthRedirect,
// )(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
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

// export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent));

export default compose(
  connect(mapStateToProps, {getUserProfile}),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);

