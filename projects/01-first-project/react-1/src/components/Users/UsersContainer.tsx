import React from 'react';
import { getUsersSt, getPageSize, getTotalUsersCount, getCurrentPage, getFollowingInProgress, getIsFetching } from '../../redux/users-selectors.ts';
import { connect } from 'react-redux';
import {follow, unfollow, getUsers} from './../../redux/users-reducer.ts'
import Users from './Users.tsx'
import Preloader from '../Common/Preloader/Preloader'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';


type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (pageNumber: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

/* type PropsType = {
    pageTitle: string
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: () => void
    follow: () => void
    getUsers: (pageNumber: number, pageSize: number) => void
} */

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      followingInProgress={this.props.followingInProgress}
                />
               </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType  => {
    return {
        users: getUsersSt(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            follow, unfollow, getUsers
        }
    ),
    withAuthRedirect,
)(UsersContainer)