import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post.tsx';
// import { addPostActionCreator, updateNewPostText } from '../../../redux/profile-reducer'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator  } from '../../../utils/validators/validators.ts';
import {Textarea} from '../../Common/FormsControls/FormsControls.tsx'

const maxLength15 = maxLengthCreator(15)

type AddNewPostFormValuesType = {
  newPostText: string
}

type PropsType = {
  posts: Array<AddNewPostFormValuesType>
  onAddPost: (newPostText: string) => void
}

const MyPosts = (props) => {
  let postsElements = props.postsData.map( (post) => {
    return <Post key={post.id} message={post.message} countLike={post.countLike}/>
  })

  let newPostElement = React.createRef()

  let onAddPost = (values: AddNewPostFormValuesType) => {
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

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType> = (props) => {
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

const AddNewPostFormRedux = reduxForm<AddNewPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;