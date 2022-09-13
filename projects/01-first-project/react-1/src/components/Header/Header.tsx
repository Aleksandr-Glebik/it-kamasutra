import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}
export type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
      <header className={styles.header}>
        <img src="https://image.shutterstock.com/image-vector/location-icon-vector-simple-sign-600w-1428674642.jpg" alt="logo" className={styles.img}></img>

        <div className={styles.loginBlock}>
          {props.isAuth
            ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
            : <NavLink to={'/login'}>Login</NavLink>}
        </div>
      </header>
    )
}

export default Header;