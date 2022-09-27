import React, { useEffect, useState } from "react"
import { List } from 'antd'
import s from './SearchPage.module.css'
import axios from "axios"

export type SearchUserType = {
    login: string
    id: number
}

export type SearchResultType = {
    items: SearchUserType[]
}

export type UserListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

const UsersList = (props: UserListPropsType) => {
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
            style={{marginTop: 25}}
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

export default UsersList