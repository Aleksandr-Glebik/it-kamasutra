import React, { useEffect, useState } from "react"
import s from './SearchPage.module.css'
import Search from './Search.tsx'
import UsersList, {SearchUserType} from './UsersList.tsx'
import UserDetails from './UserDetails.tsx'

const SearchPage: React.FC = () => {
    return (
        <div>
            <Searcher />
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