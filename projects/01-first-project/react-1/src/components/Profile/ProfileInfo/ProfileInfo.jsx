import React from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import styles from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
      return <Preloader />
    }

    return (
      <div>
        <div className={styles.descriptionBlock}>
          <h2>{profile.aboutMe}</h2>
          <img src={profile.photos.large}></img>
          <h3>contacts</h3>
          <ul>
            <li>{profile.contacts.facebook}</li>
            <li>{profile.contacts.vk}</li>
            <li>{profile.contacts.twitter}</li>
            <li>{profile.contacts.instagram}</li>
            <li>{profile.contacts.github}</li>
          </ul>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
      </div>
    )
}

export default ProfileInfo;