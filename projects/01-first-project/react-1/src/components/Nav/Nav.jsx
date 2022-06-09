import React from 'react'
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
      <nav className={styles.nav}>
        <div>
          <NavLink to="/profile" className={navData => navData.isActive ? styles.active : styles.item}>Profile</NavLink>
        </div>
        <div>
          <NavLink to="/dialogs" className={navData => navData.isActive ? styles.active : styles.item}>Messages</NavLink>
        </div>
        <div>
          <NavLink to="/users" className={navData => navData.isActive ? styles.active : styles.item}>Users</NavLink>
        </div>
        <div>
          <NavLink to="/news" className={navData => navData.isActive ? styles.active : styles.item}>News</NavLink>
        </div>
        <div>
          <NavLink to="/music" className={navData => navData.isActive ? styles.active : styles.item}>Music</NavLink>
        </div>
        <div>
          <NavLink to="/setting" className={navData => navData.isActive ? styles.active : styles.item}>Settings</NavLink>
        </div>
      </nav>

    )
}

export default Nav;