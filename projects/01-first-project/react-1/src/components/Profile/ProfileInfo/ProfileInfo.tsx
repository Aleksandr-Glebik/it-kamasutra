import React, {useState, useEffect, ChangeEvent} from 'react'
import Preloader from '../../Common/Preloader/Preloader.tsx'
import styles from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks.tsx'
import userPhoto from '../../../assets/img/user.jpg'
import ProfileDataForm from './ProfileDataForm.tsx'
import {ProfileType} from '../../../types/types.ts'
import { ContactsType } from '../../../types/types'
import { Image } from 'antd'

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
      return <Preloader />
    }

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
          savePhoto(event.target.files[0])
      }
    }

    const onSubmit = (formData: ProfileType) => {
      // todo: remove then
      saveProfile(formData).then(
        () => {
          setEditMode(false)
        }
      )
    }


    return (
      <div>
        <div className={styles.descriptionBlock}>
          <h2>{profile.aboutMe}</h2>
          <Image src={profile.photos.large || userPhoto} className={styles.mainPhoto}></Image>
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

          { editMode
             ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
             : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner} />}

          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

        </div>
      </div>
    )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return (
    <div>
      { isOwner &&
       <div>
         <button onClick={goToEditMode} >edit</button>
       </div>}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob &&
      <div>
        <b>My professional skills:</b> {profile.lookingForAJobDescription}
      </div>
      }
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
      </div>
  </div>
  )
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return (
      <div className={styles.contact}>
       <b>{contactTitle}</b>: {contactValue}
      </div>
  )
}

export default ProfileInfo;