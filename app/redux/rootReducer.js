import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as homeReducer } from "../modules/home"

/**
 * The reducers are the in charge of updating the state of our app. 
 * In the redux folder, create the rootReducer.js file. 
 * In this file, we will import the reducers from our modules 
 * and use redux combineReducers function to merge them together 
 * into a single state object that we will later use to create our redux store.
 */

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;