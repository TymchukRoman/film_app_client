const initialState = {
    user: null
}

const userReducer = (state = initialState, action) => {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                user: action.user
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                user: null
            }
        }
        default:
            return state
    }
}

export const userActions = {
    login: (user) => ({ type: 'LOGIN', user }),
    logout: () => ({ type: 'LOGOUT' }),
}

export const setLoginedUser = (user) => (dispatch) => {
    dispatch(userActions.login(user));
}

export const logoutUser = () => (dispatch) => {
    dispatch(userActions.logout())
}

export default userReducer;