import React from "react"
import { FilterType } from "../../redux/users-reducer"
import { UserType } from "../../types/types"
import Paginator from '../Common/Paginator/Paginator.tsx'
import User from './User.tsx'
import { UsersSearchForm } from "./UsersSearchForm.tsx"

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize}/>
                {
                    users.map((u) => {
                        return <User user={u}
                                    followingInProgress={props.followingInProgress}
                                    unfollow={props.unfollow}
                                    follow={props.follow}
                                    key={u.id} />
                    })
                }
        </div>
    )
}



export default Users;
