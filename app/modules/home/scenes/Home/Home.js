import React from 'react';
var { View, StyleSheet, Alert } = require('react-native');

import {Button, Header} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import MainHeader from "../../components/MainHeader";

import styles from "./styles"
import { text } from "../../../../styles/theme";

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

/**
 * In this scene we are adding a log out button.
 */

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
        
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);