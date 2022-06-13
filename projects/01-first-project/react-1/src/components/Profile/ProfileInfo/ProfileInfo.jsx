import React from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import styles from './ProfileInfo.module.css'
// console.log('styles', styles);

const ProfileInfo = (props) => {
    if (!props.profile) {
      return <Preloader />
    }

    return (
      <div>
        <div>
         <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80" className={styles.img}></img>
        </div>
        <div className={styles.descriptionBlock}>
          <h2>{props.profile.aboutMe}</h2>
          <img src={props.profile.photos.large}></img>
          <h3>contacts</h3>
          <ul>
            <li>{props.profile.contacts.facebook}</li>
            <li>{props.profile.contacts.vk}</li>
            <li>{props.profile.contacts.twitter}</li>
            <li>{props.profile.contacts.instagram}</li>
            <li>{props.profile.contacts.github}</li>
          </ul>
        </div>
      </div>
    )
}

export default ProfileInfo;