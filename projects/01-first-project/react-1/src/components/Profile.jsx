import React from 'react'
import styles from './Profile.module.css'
console.log('styles', styles);

const Profile = () => {
    return (
      <div className={styles.content}>
        <div>
         <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80" className={styles.img}></img>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1101&q=80" className={styles.img__profile} alt="photo-user"></img>
        </div>
        <div>
          My post
          <div>
            New post
          </div>
          <div className={styles.post}>
            <div className={styles.item}>
              Post 1
            </div>
            <div className={styles.item}>
              Post 2
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile;