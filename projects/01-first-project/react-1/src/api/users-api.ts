import { AxiosPromise } from 'axios'
import {GetItemsType, instance, APIResponseType } from './api.ts'
import { profileAPI } from './profile-api.ts'


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '') {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
}