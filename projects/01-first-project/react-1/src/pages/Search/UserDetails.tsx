import React, { useEffect, useState } from "react"
import { Card, Image } from 'antd'
import axios from "axios"
import {SearchUserType} from './UsersList.tsx'
import Timer from './Timer.tsx'

export type UserType = {
    login: string
    id: number
    avatar_url: string
    public_repos: number
    followers: number
}

export type UserDetailsPropsType = {
    user: SearchUserType | null
}

const startTimerSeconds = 10

const UserDetails = (props: UserDetailsPropsType) => {

    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [seconds, setSeconds] = useState(startTimerSeconds)

    useEffect( () => {
        console.log('sync user details')
        if (!!props.user) {
            axios
            .get<UserType>(`https://api.github.com/users/${props.user.login}`)
            .then(res => {
                setSeconds(startTimerSeconds)
                setUserDetails(res.data)
            })
        }
    }, [props.user])

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <div className="site-card-border-less-wrapper">
            { userDetails &&
            <>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails?.id.toString()}/>
                <Card title={userDetails?.login}
                    bordered={false}
                    style={{ width: 200 }}
                    cover={
                    <Image
                        width={200}
                        alt="user-photo"
                        src={userDetails?.avatar_url}
                    />
                    }
                >
                    <p>login: {userDetails?.login}</p>
                    <p>ID: {userDetails?.id}</p>
                    <p>Followers: {userDetails?.followers}</p>
                    <p>Public repositories: {userDetails?.public_repos}</p>
                </Card>
            </>}
        </div>
    )
}

export default UserDetails