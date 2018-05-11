import { AsyncStorage } from 'react-native';

import * as t from './actionTypes';

/**
 * It’s up to the reducer to decide if it needs to modify the app state or not 
 * based on the action type.
 * 
 * LOGGED_IN
 * For this action type, the reducer sets the isLoggedIn state variable to true, 
 * sets the user state variable and stores the user object in the AsyncStorage.
 * 
 * LOGGED_OUT
 * The reducer sets the isLoggedIn state to false, 
 * sets the user state variable to null 
 * and removes the user object from the AsyncStorage.
 */

let initialState = { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGGED_IN:
            const user = action.data;

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            state = Object.assign({}, state, { isLoggedIn: true, user: user });

            return state;

        case t.LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            state = Object.assign({}, state, {isLoggedIn: false, user: null });

            return state;

        default:
            return state;
    }
};

export default authReducer;