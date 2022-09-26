import React, { useEffect, useState } from "react"
import { Button, Input, List, Card } from 'antd'
import s from './SearchPage.module.css'
import axios from "axios"

//https://api.github.com/search/users?q=it-kamasutra

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

const Searcher: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect( () => {
        console.log('sync tab title')

        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect( () => {
        console.log('sync users')
        axios
            .get<SearchResultType>('https://api.github.com/search/users?q=it-kamasutra')
            .then(res => {
                setUsers(res.data.items)
            })
    }, [])

    return (
        <div className={s.container}>
            <div style={{ width: 200, marginRight: 25 }}>
                <Input placeholder="Search" />
                <Button>Find</Button>
                <List
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
                />
            </div>
            <div className="site-card-border-less-wrapper">
                <Card title="Username" bordered={false} style={{ width: 200 }}>
                    <p>Details 1</p>
                    <p>Details 2</p>
                    <p>Details 3</p>
                </Card>
            </div>
        </div>
    )
}

export default SearchPage