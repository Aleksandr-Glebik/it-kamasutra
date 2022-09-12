// import React from 'react'
import { actions } from '../../../redux/profile-reducer.ts'
import MyPosts from './MyPosts.tsx';
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch( actions.addPostActionCreator(newPostText) )
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;