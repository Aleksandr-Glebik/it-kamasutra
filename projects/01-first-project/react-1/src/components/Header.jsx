import React from 'react'
import styles from './Header.module.css'

const Header = () => {
    return (
      <header className={styles.header}>
        <img src="https://image.shutterstock.com/image-vector/location-icon-vector-simple-sign-600w-1428674642.jpg" alt="logo" className={styles.img}></img>
      </header>
    )
}

export default Header;