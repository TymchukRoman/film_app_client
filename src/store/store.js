import { createStore, combineReducers } from 'redux'
import { user } from './reducers/user.reducer';


export const store = createStore(combineReducers({ user, product, account }))