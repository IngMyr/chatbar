import { auth, database, provider } from "../../config/firebase";

/**
 * The register function takes in the users data and a callback function as parameter, 
 * it extracts the email and password from the data object 
 * and calls Firebase createUserWithEmailAndPassword function to create a new user. 
 * If successful, the user object is returned.
 */

//Register the user using email and password
export function register(data, callback) {
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => callback(true, user, null))
        .catch((error) => callback(false, null, error));
}

/**
 * After the registration, the user will be prompted to select a username, 
 * the username is injected into the user object and passed to 
 * the createUser function in order to create the user object in the Realtime Database
 */

//Create the user object in realtime database
export function createUser (user, callback) {
    database.ref('users').child(user.uid).update({ ...user })
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}

/**
 * The login function is similar to the register function 
 * but it calls Firebase signInWithEmailAndPassword function to log the user in. 
 * If successful, the user object is returned. 
 */

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}

/**
 * The user object is then passed to the getUser function 
 * in order to retrieve the user object form the Realtime Database.
 */

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}

/**
 * The signInWithFacebook function takes in the Facebook token that
 * is returned when the user grants access to the app 
 * and a callback function as parameters. 
 * Using the token, we create a credential object that is passed to 
 * Firebase signInWithCredential function in order to log in the user. 
 * If successful, the user object is returned.
 */

//Sign user in using Facebook
export function signInWithFacebook (fbToken, callback) {
    const credential = provider.credential(fbToken);
    auth.signInWithCredential(credential)
        .then((user) => getUser(user, callback))
        .catch((error) => callback(false, null, error));
}
