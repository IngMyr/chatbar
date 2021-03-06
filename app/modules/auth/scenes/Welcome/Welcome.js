import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import { Facebook } from 'expo';

/**
 * Using Expo’s Facebook logInWithReadPermissionsAsync function, 
 * our onSignInWithFacebook prompts the user to log into 
 * Facebook and grant the app permission to access their Facebook data. 
 * If login is successful, we call the signInWithFacebook function in our actions file.
 * 
 * If the function returns successfully, 
 * our onSuccess function is called and the app navigates to the Main scene.
 * 
 * If the function returns an error, 
 * our onError function is in charge of displaying an error message.
 */

import { actions as auth, constants as c } from "../../index"
const { signInWithFacebook } = auth;

import styles from "./styles"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}


        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
    }


    //get users permission authorization (ret: facebook token)
    async onSignInWithFacebook() {
        const options = {permissions: ['public_profile', 'email'],}
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, options);

        if (type === 'success') {
            this.props.signInWithFacebook(token, this.onSuccess, this.onError)
        }
    }

    onSuccess({ exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({ user })
    }

    onError(error) {
        console.log(error);
        alert(error.message);
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        {/* <Image style={styles.image} source={{uri: "a"}}/>  */}
                        <Text style={styles.title}>Chatbar</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <SocialIcon
                                raised
                                button
                                type='facebook'
                                title='SIGN UP WITH FACEBOOK'
                                iconSize={19}
                                style={[styles.containerView, styles.socialButton]}
                                fontStyle={styles.buttonText}
                                onPress={this.onSignInWithFacebook}/>

                            <View style={styles.orContainer}>
                                <Divider style={styles.divider} />
                                <Text style={styles.orText}>
                                    Or
                                </Text>
                            </View>

                            <Button
                                raised
                                borderRadius={4}
                                title={'SIGN UP WITH E-MAIL'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={Actions.Register}/>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.bottomText}>
                                Already have an account?
                            </Text>

                            <TouchableOpacity onPress={Actions.Login}>
                                <Text style={styles.signInText}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
        );
    }
}


export default connect(null, {  signInWithFacebook })(Welcome);