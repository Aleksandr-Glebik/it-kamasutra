import { actions, profileReducer } from "./profile-reducer";

let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', countLike: '20'},
        {id: 2, message: 'Fine, and You?', countLike: '15'},
        {id: 3, message: 'Me too', countLike: ''},
    ],
    profile: null,
    status: '',
    // newPostText: ''
}

test('length must be changed', () => {
    // 1. TEST DATA
    let action = actions.addPostActionCreator('uje skoro i bydy zarabatuvat mnogo deneggg')

    // 2. ACTION
    let newState = profileReducer(state, action)

    // 3. EXPECTATION
    expect(newState.postsData.length).toBe(4)
});

test('message of new post should be correct', () => {
    // 1. TEST DATA
    let action = actions.addPostActionCreator('uje skoro i bydy zarabatuvat mnogo deneggg')

    // 2. ACTION
    let newState = profileReducer(state, action)

    // 3. EXPECTATION
    expect(newState.postsData[3].message).toBe('uje skoro i bydy zarabatuvat mnogo deneggg')
});

test('after deleting length of postData should be decrement', () => {
    // 1. TEST DATA
    let action = actions.deletePost(1)

    // 2. ACTION
    let newState = profileReducer(state, action)

    // 3. EXPECTATION
    expect(newState.postsData.length).toBe(2)
});

test('after deleting length should not be decrement if id is incorrect', () => {
    // 1. TEST DATA
    let action = actions.deletePost(1000)

    // 2. ACTION
    let newState = profileReducer(state, action)

    // 3. EXPECTATION
    expect(newState.postsData.length).toBe(3)
});
