import React, { useEffect, useState } from "react"
import { Button, Input, List, Card, Image } from 'antd'
import s from './SearchPage.module.css'
import axios from "axios"

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
        // console.log('sync users')
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
                    // document.title = item
                }}
            >{item.login}</List.Item>}
        />
    )
}

const Searcher: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    // const [users, setUsers] = useState<SearchUserType[]>([])
    // const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')
    const [userDetails, setUserDetails] = useState<UserType | null>(null)

    useEffect( () => {
        // console.log('sync tab title')
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    // useEffect( () => {
    //     // console.log('sync users')
    //     axios
    //         .get<SearchResultType>(`https://api.github.com/search/users?q=${searchTerm}`)
    //         .then(res => {
    //             setUsers(res.data.items)
    //         })
    // }, [searchTerm])

    useEffect( () => {
        console.log('sync user details')
        if (!!selectedUser) {
            axios
            .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
            .then(res => {
                setUserDetails(res.data)
            })
        }
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div style={{ width: 200, marginRight: 25 }}>
                {/* <Input
                    placeholder="Search"
                    value={tempSearch}
                    onChange={e => setTempSearch(e.currentTarget.value)}
                />
                <Button
                    onClick={() => {
                        setSearchTerm(tempSearch)
                    }}
                >Find</Button> */}
                <Search value={searchTerm} onSubmit={ (value: string) => {setSearchTerm(value)}}/>
                <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
                {/* <List
                    size="small"
                    bordered
                    dataSource={users}
                    renderItem={item => <List.Item
                        key={item.id}
                        className={selectedUser === item
                            ? s.selected
                            : ''
                        }
                        onClick={() => {
                            setSelectedUser(item)
                            // document.title = item
                        }}
                    >{item.login}</List.Item>}
                /> */}
            </div>
            <div className="site-card-border-less-wrapper">
                {userDetails &&
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
                </Card>}
            </div>
        </div>
    )
}

export default SearchPage