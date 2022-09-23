import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { FilterType, getUsers } from "../../redux/users-reducer.ts"
import Paginator from '../Common/Paginator/Paginator.tsx'
import User from './User.tsx'
import { UsersSearchForm } from "./UsersSearchForm.tsx"
import {getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsersSt, getFollowingInProgress} from '../../redux/users-selectors.ts'
import {useNavigate, useLocation} from 'react-router-dom'

const queryString = require('query-string')

type PropsType = {}

type QueryParamsType = {term?: string, page?: string, friend?: string}

const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsersSt)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const search = location.search
        const str = new URLSearchParams(search)

        let actualPage = currentPage
        let actualFilter = filter

        if (str.get("page")) {
            actualPage = Number(str.get("page"))
        }
        if (str.get("term")) {
            actualFilter = {...actualFilter, term: str.get("term")}
        }
        switch(str.get("friend")) {
            case 'null':
                actualFilter = {...actualFilter, friend: 'null'}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: 'true'}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: 'false'}
                break
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect( () => {
        const query: QueryParamsType = {}

        if (!!filter.term) {
            query.term = filter.term
        }
        if (currentPage != 1) {
            query.page = String(currentPage)
        }
        if (filter.friend != 'null') {
            query.friend = String(filter.friend)
        }

        navigate({
            pathname: '/developers',
            search: queryString.stringify(query)
        })

    }, [filter, currentPage])

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
