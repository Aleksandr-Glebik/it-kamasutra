import React from 'react';
import { getIsFetching } from '../../redux/users-selectors.ts';
import { useSelector } from 'react-redux';
import Users from './Users.tsx'
import Preloader from '../Common/Preloader/Preloader.tsx'

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
           </>
}

export default UsersPage