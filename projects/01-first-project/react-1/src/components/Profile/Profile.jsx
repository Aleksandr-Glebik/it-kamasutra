import React from 'react'
import MyPosts from './MyPosts/MyPosts';
import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
// console.log('styles', styles);

const Profile = (props) => {
    return (
      <div>
        <ProfileInfo />
        <MyPosts postsData={props.postsData} />
      </div>
    )
}

export default Profile;