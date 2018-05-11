import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

/**
 * Our Splash scene consists of a View and an Activity Indicator 
 * to indicate that the app is loading, this view is visible 
 * while our app checks if the user is logged in or not. 
 */

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {/* <Image style={styles.image} source={{uri: "a"}}/> */}
                    <Text style={styles.title}>Chatbar</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}