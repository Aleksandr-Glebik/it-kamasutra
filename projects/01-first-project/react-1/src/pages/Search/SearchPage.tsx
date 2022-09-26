import React, { useEffect, useState } from "react"
import { Button, Input, List, Card } from 'antd'
import s from './SearchPage.module.css'

const SearchPage: React.FC = () => {
    return (
        <div>
            <Searcher />
        </div>
    )
}

const Searcher: React.FC = () => {

    const data = ['Sasha', 'Pasha']
    const [selectedUser, setSelectedUser] = useState<string | null>(null)

    useEffect( () => {
        console.log('useeffect');

        if (selectedUser) {
            document.title = selectedUser
        }
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div style={{ width: 200, marginRight: 25 }}>
                <Input placeholder="Search" />
                <Button>Find</Button>
                <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item
                        className={selectedUser === item
                            ? s.selected
                            : ''
                        }
                        onClick={() => {
                            setSelectedUser(item)
                            // document.title = item
                        }}
                    >{item}</List.Item>}
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