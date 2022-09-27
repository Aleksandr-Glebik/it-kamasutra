import React, { useEffect, useState } from "react"
import { Card, Image } from 'antd'
import s from './SearchPage.module.css'
import axios from "axios"
import Search from './Search.tsx'
import UsersList, {SearchUserType} from './UsersList.tsx'
import Timer from './Timer.tsx'

// url search users = https://api.github.com/search/users?q=${it-kamasutra}
// url search user = https://api.github.com/users/${it-kamasutra}

const SearchPage: React.FC = () => {
    return (
        <div>
            <Searcher />
        </div>
    )
}

type UserType = {
    login: string
    id: number
    avatar_url: string
    public_repos: number
    followers: number
}

type UserDetailsPropsType = {
    user: SearchUserType | null
}

const startTimerSeconds = 10

export const UserDetails = (props: UserDetailsPropsType) => {

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

const Searcher: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    useEffect( () => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div style={{ width: 200, marginRight: 25 }}>
                <Search value={searchTerm} onSubmit={ (value: string) => {setSearchTerm(value)}}/>
                <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
            </div>
            <div>
                <UserDetails user={selectedUser}/>
            </div>
        </div>
    )
}

export default SearchPage