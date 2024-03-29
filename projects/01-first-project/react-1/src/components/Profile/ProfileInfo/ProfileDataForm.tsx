import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls.tsx'
import { required } from '../../../utils/validators/validators.ts';
import styles from './ProfileInfo.module.css'
import s from '../../Common/FormsControls/FormsControls.module.css'
import { ProfileType } from '../../../types/types';

type PropsType = {
  profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
       <div>
         <button>Save</button>
       </div>

       {error && <div className={s.formSummaryError}>
                {error}
       </div>}

      <div>
        <b>Full name:</b>
        <Field placeholder={'Full name'} name={"fullName"} component={Input}
                    validate={[required]}/>
      </div>
      <div>
        <b>Looking for a job:</b>
            <Field type={'checkbox'} name={"lookingForAJob"} component={Input} />
      </div>
      <div>
        <b>My professional skills:</b>
          <Field component={Textarea}
            name='lookingForAJobDescription'
            placeholder='Skills'
            validate={[required]} />
      </div>
      <div>
        <b>About me:</b>
        <Field component={Textarea}
            name='aboutMe'
            placeholder='About me'
            validate={[required]} />
      </div>
      <div>
        <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
          return (
            <div key={key} className={styles.contact}>
              <b>{key}</b>:
              <Field placeholder={`${key}`}
                     name={`contacts.${key}`}
                     component={Input}
                     validate={[]}/>
            </div>
          )
        })}
      </div>
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'editProfile'})(ProfileDataForm)

export default ProfileDataFormReduxForm