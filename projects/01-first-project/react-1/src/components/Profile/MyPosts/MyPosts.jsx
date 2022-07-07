import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostText } from '../../../redux/profile-reducer'
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator  } from '../../../utils/validators/validators';
import {Textarea} from '../.././/Common/FormsControls/FormsControls'

const maxLength15 = maxLengthCreator(15)

const MyPosts = (props) => {
  let postsElements = props.postsData.map( (post) => {
    return <Post message={post.message} countLike={post.countLike}/>
  })

  let newPostElement = React.createRef()

  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={styles.postsBlock}>
        <h3>My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        <div className={styles.posts}>
          { postsElements  }
        </div>
    </div>

    )
}

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
          <div>
            <Field component={Textarea} name='newPostText' placeholder='Post message'
              validate={[required, maxLength15]} />
          </div>
          <div>
            <button>Add post</button>
          </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;