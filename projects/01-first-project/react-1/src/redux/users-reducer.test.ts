import usersReducer, { actions, InitialStateType } from './users-reducer';

let state: InitialStateType;

beforeEach( () => {
    state = {
        users: [
            {
                id: 0,
                name: 'Sasha 0',
                photos: {small: null, large: null},
                status: 'status 0',
                followed: false
            },
            {
                id: 1,
                name: 'Sasha 1',
                photos: {small: null, large: null},
                status: 'status 1',
                followed: false
            },
            {
                id: 2,
                name: 'Sasha 2',
                photos: {small: null, large: null},
                status: 'status 2',
                followed: true
            },
            {
                id: 3,
                name: 'Sasha 3',
                photos: {small: null, large: null},
                status: 'status 3',
                followed: true
            },

        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()

})