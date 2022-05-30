import React from 'react'
import styles from './Nav.module.css'
// console.log('styles', styles);

const Nav = () => {
    return (
      <nav className={styles.nav}>
        <div className={`${styles.item} ${styles.active}`}>
          <a href="/profile">Profile</a>
        </div>
        <div className={styles.item}>
          <a href="/dialogs">Messages</a>
        </div>
        <div className={styles.item}>
          <a href="/news">News</a>
        </div>
        <div className={styles.item}>
          <a href="/music">Music</a>
        </div>
        <div className={styles.item}>
          <a href="/setting">Settings</a>
        </div>
      </nav>
    )
}

export default Nav;