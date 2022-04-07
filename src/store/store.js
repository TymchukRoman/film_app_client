import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import user from './reducers/user.reducer';

let rootReducer = combineReducers({
    profile: user,
})

const composeEnhancers = compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
window.__store__ = store;