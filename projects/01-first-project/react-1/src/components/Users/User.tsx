import React from "react"
import styles from './users.module.css'
import userPhoto from './../../assets/img/user.jpg'
import { NavLink } from "react-router-dom"
import { UserType } from "../../types/types"
import { Card, Button } from 'antd'
const { Meta } = Card

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <Card
            hoverable
            style={{ width: 200 }}
            cover={<NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt="prhoto" />
                </NavLink>
                }
        >
            <Meta title={user.name} style={{marginBottom: '0.5rem'}}/>
            {user.followed
            ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {unfollow(user.id)}}>Unfollow</Button>
            : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {follow(user.id)}}>Follow</Button>
            }
        </Card>
    )
}

export default User
