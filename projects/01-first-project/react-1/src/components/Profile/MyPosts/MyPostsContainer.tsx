// import React from 'react'
import { actions } from '../../../redux/profile-reducer.ts'
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts.tsx';
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    // newPostText: state.profilePage.newPostText,
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostText) => {
//       dispatch( actions.addPostActionCreator(newPostText) )
//     },
//   }
// }

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;