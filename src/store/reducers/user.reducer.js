const initialState = {
    user: null
}

export default (state = initialState, action) => {
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

export const loginUser = (name) => (dispatch) => {
    dispatch(userActions.login(name));
}

export const logoutUser = () => (dispatch) => {
    dispatch(userActions.logout())
}