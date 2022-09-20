import React from 'react'
import styles from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
    id: number
    path: string
    name: string
}

let DialogItem: React.FC<PropsType> = (props) => {
    let path = `/dialogs/${props.id}`
    return (
        <div className={`${styles.dialogs} ${styles.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
