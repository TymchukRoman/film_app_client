import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import user from './reducers/user.reducer';
import search from './reducers/search.reducer';

let rootReducer = combineReducers({
    profile: user,
    search
})

const composeEnhancers = compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
window.__store__ = store;