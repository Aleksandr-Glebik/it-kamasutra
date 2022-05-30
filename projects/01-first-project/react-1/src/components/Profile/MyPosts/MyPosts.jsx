import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
// console.log('styles', styles);

const MyPosts = () => {
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
            <Post message='Hi, how are you?' countLike='20'/>
            <Post message='Fine, and You?' countLike='15'/>
          </div>
      </div>

    )
}

export default MyPosts;