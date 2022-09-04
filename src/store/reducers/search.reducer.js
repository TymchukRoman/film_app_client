const initialState = {
    isUsed: false,
    params: null,
    page: 1,
    limit: 10,
    sort: '-released'
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PARAMS': {
            let isUsed = false;
            if (action.params) {
                isUsed = true;
            }
            return {
                ...state,
                isUsed,
                params: action.params
            }
        }
        case 'SET_PAGE': {
            return {
                ...state,
                page: action.page
            }
        }
        case 'SET_LIMIT': {
            return {
                ...state,
                limit: action.limit
            }
        }
        case 'SET_SORT': {
            return {
                ...state,
                sort: action.sort
            }
        }
        default:
            return state
    }
}

export const searchActions = {
    setParams: (params) => ({ type: 'SET_PARAMS', params }),
    setPage: (page) => ({ type: 'SET_PAGE', page }),
    setLimit: (limit) => ({ type: 'SET_LIMIT', limit }),
    setSort: (sort) => ({ type: 'SET_SORT', sort }),
}

export const setParams = (params) => (dispatch) => {
    dispatch(searchActions.setParams(params));
}

export const setPage = (page) => (dispatch) => {
    dispatch(searchActions.setPage(page));
}

export const setLimit = (limit) => (dispatch) => {
    dispatch(searchActions.setLimit(limit));
}

export const setSort = (sort) => (dispatch) => {
    dispatch(searchActions.setSort(sort));
}

export default searchReducer;