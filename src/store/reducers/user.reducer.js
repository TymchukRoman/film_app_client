const initialState = {
    user: {}
}

export default (state = initialState, action) => {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}