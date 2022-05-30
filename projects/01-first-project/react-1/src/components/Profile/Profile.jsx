import React from 'react'
import MyPosts from './MyPosts/MyPosts';
import styles from './Profile.module.css'
// console.log('styles', styles);

const Profile = () => {
    return (
      <div>
        <div>
         <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80" className={styles.img}></img>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1101&q=80" className={styles.img__profile} alt="photo-user"></img>
        </div>
        <MyPosts />
      </div>
    )
}

export default Profile;