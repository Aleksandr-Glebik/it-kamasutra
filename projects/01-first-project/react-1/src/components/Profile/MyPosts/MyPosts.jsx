import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
const MyPosts = (props) => {
  let postsElements = props.postsData.map( (post) => {
    return <Post message={post.message} countLike={post.countLike}/>
  })

  let newPostElement = React.createRef()

  let addPost = () => {
    props.addPost()
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    props.updateNewPostText(text)
  }

  return (
    <div className={styles.postsBlock}>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
          </div>
          <div>
            <button onClick={addPost}>Add post</button>
          </div>
        </div>
        <div className={styles.posts}>
          { postsElements  }
        </div>
    </div>

    )
}

export default MyPosts;