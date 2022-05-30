import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    let path = `/dialogs/${props.id}`
    return (
        <div className={`${styles.dialogs} ${styles.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {

    return (
        <div className={styles.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <DialogItem name='Sasha' id='1'/>
                <DialogItem name='Pasha' id='2'/>
                <DialogItem name='Masha' id='3'/>
                <DialogItem name='Natasha' id='4'/>
                <DialogItem name='Olga' id='5'/>
                </div>
            <div className={styles.messages}>
                <Message message='Hi!' />
                <Message message='Hello, my friend' />
                <Message message='I am not your friend' />
                <Message message='Whay?' />
                <Message message='Because you do not know how to react' />
                <Message message='BUT I AM LEARNING' />
                <Message message='Good, now you are my friend!!!' />
            </div>
        </div>
    )
}

export default Dialogs;
