import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { FilterType, getUsers } from "../../redux/users-reducer.ts"
import Paginator from '../Common/Paginator/Paginator.tsx'
import User from './User.tsx'
import { UsersSearchForm } from "./UsersSearchForm.tsx"
import {getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsersSt, getFollowingInProgress} from '../../redux/users-selectors.ts'

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsersSt)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize}/>
                {
                    users.map((u) => {
                        return <User user={u}
                                    followingInProgress={followingInProgress}
                                    unfollow={unfollow}
                                    follow={follow}
                                    key={u.id} />
                    })
                }
        </div>
    )
}

export default Users
