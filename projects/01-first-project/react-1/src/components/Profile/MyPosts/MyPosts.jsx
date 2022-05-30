import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
// console.log('styles', styles);

const MyPosts = () => {
    return (
      <div>
          My post
          <div>
            New post
          </div>
          <div className={styles.post}>
            <Post message='Hi, how are you?' countLike='20'/>
            <Post message='Fine, and You?' countLike='15'/>
          </div>
      </div>

    )
}

export default MyPosts;