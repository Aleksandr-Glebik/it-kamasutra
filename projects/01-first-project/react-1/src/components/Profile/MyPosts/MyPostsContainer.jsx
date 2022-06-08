import React from 'react'
import { addPostActionCreator, updateNewPostText } from '../../../redux/profile-reducer'
import StoreContext from '../../../storeContext';
import MyPosts from './MyPosts';

const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      { store => {
        let state = store.getState()
        let addPost = () => {
          store.dispatch( addPostActionCreator() )
        }
        let onPostChange = (text) => {
        let action = updateNewPostText(text)
          store.dispatch(action)
        }
        return <MyPosts updateNewPostText={ onPostChange }
                        addPost={addPost}
                        postsData={state.profilePage.postsData}
                        newPostText={state.profilePage.newPostText}/>
      }
    }
    </StoreContext.Consumer>
  )
}

export default MyPostsContainer;