import React, { useEffect, useState } from "react"
import { Button, Input, List, Card, Image, Space, TimePicker } from 'antd'
import s from './SearchPage.module.css'
import axios from "axios"
import moment from 'moment'

// url search users = https://api.github.com/search/users?q=${it-kamasutra}
// url search user = https://api.github.com/users/${it-kamasutra}

const SearchPage: React.FC = () => {
    return (
        <div>
            <Searcher />
        </div>
    )
}

type SearchUserType = {
    login: string
    id: number
}

type SearchResultType = {
    items: SearchUserType[]
}

type UserType = {
    login: string
    id: number
    avatar_url: string
    public_repos: number
    followers: number
}

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const Search = (props: SearchPropsType) => {
    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <>
        <Input
            placeholder="Search"
            value={tempSearch}
            onChange={e => setTempSearch(e.currentTarget.value)}
        />
        <Button
            onClick={() => {
                props.onSubmit(tempSearch)
            }}
        >Find</Button>
        </>
    )
}

type UserListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

export const UsersList = (props: UserListPropsType) => {
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect( () => {
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return (
        <List
            size="small"
            bordered
            dataSource={users}
            renderItem={item => <List.Item
                key={item.id}
                className={props.selectedUser === item
                    ? s.selected
                    : ''
                }
                onClick={() => {
                    props.onUserSelect(item)
                }}
            >{item.login}</List.Item>}
        />
    )
}

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
}

export const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(props.seconds)

    useEffect( () => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect( () => {
        setInterval(() => {
            setSeconds( prev => prev - 1)
        }, 2000)
    }, [])

    return (
        <Space direction="vertical">
            <TimePicker value={moment(`00:${seconds}`, 'mm:ss')}
                        disabled
            />
        </Space>
    )
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
                setUserDetails(res.data)
                setSeconds(startTimerSeconds)
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
                    <Timer seconds={seconds} onChange={setSeconds}/>
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