import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
// console.log('styles', styles);

const MyPosts = (props) => {
  let postsElements = props.postsData.map( (post) => {
    return <Post message={post.message} countLike={post.countLike}/>
  })

    return (
      <div className={styles.postsBlock}>
          <h3>My posts</h3>
          <div>
            <div>
              <textarea></textarea>
            </div>
            <div>
              <button>Add post</button>
            </div>
          </div>
          <div className={styles.posts}>
            { postsElements  }
          </div>
      </div>

    )
}

export default MyPosts;