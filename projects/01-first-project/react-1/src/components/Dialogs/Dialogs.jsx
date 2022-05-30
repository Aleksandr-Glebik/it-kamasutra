import React from 'react'
import styles from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'


const Dialogs = (props) => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <div className={`${styles.dialog} ${styles.active}`}>
                   <NavLink to='/dialogs/1'>Sasha</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to='/dialogs/2'>Pasha</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to='/dialogs/3'>Masha</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to='/dialogs/4'>Natasha</NavLink>
                </div>
                <div className={styles.dialog}>
                    <NavLink to='/dialogs/5'>Olga</NavLink>
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.message}>Hi!</div>
                <div className={styles.message}>Hello, my friend</div>
                <div className={styles.message}>I am not your friend</div>
                <div className={styles.message}>Whay</div>
                <div className={styles.message}>Because you don't know how to react</div>
                <div className={styles.message}>BUT I AM LEARNING</div>
                <div className={styles.message}>Good, now you are my friend!!!</div>
            </div>
        </div>
    )
}

export default Dialogs;
