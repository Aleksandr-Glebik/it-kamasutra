import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post';
// console.log('styles', styles);

const MyPosts = () => {

  let postsData = [
    {id: 1, message: 'Hi, how are you?', countLike: '20'},
    {id: 2, message: 'Fine, and You?', countLike: '15'},
    {id: 3, message: 'Me too', countLike: ''},
  ]

  let postsElements = postsData.map( (post) => {
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