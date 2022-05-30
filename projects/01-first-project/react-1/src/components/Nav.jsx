import React from 'react'
import styles from './Nav.module.css'
// console.log('styles', styles);

const Nav = () => {
    return (
      <nav className={styles.nav}>
        <div className={`${styles.item} ${styles.active}`}>
          <a href="#">Profile</a>
        </div>
        <div className={styles.item}>
          <a href="#">Messages</a>
        </div>
        <div className={styles.item}>
          <a href="#">News</a>
        </div>
        <div className={styles.item}>
          <a href="#">Musik</a>
        </div>
        <div className={styles.item}>
          <a href="#">Settings</a>
        </div>
      </nav>
    )
}

export default Nav;