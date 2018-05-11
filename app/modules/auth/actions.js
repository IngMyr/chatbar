import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

/**
 *  Each function in our actions file is in charge of calling 
 * the appropriate API function and carrying out the right action 
 * based on the response returned.
 */

export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.register(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function createUser(user, successCB, errorCB) {
    return (dispatch) => {
        api.createUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_IN, data: user});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        api.login(data, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn) {
                //get the user object from the Async storage
                AsyncStorage.getItem('user', (err, user) => {
                    if (user === null) isLoggedIn = false //set the loggedIn value to false
                    else dispatch({type: t.LOGGED_IN, data: JSON.parse(user)})

                    callback(isLoggedIn);
                });
            } else {
                dispatch({type: t.LOGGED_OUT});
                callback(isLoggedIn);
            }
        });
    };
}

/**
 * This function will call the signInWithFacebook function in the api.js file 
 * and carry out the right action based on the response returned.
 */

export function signInWithFacebook(facebookToken, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}
