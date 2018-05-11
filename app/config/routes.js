import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

/**
 * In this file we will set up our Router and Scenes, 
 * check React Native Router repo for more information about the basic setup.
 * 
 * The first thing we will do is import our scenes and components.
 * 
 * The second thing we will do is import our store 
 * and the checkLoginStatus action from our auth actions file 
 * to check if the user is logged in or not.
 */

 /**
  * Code Breakdown
  * In our constructor, we set up two state variables, 
  * isReady and isLoggedIn both with a default value of false.
  * 
  * In our componentDidMount, we call the checkLoginStatus function 
  * located in our auth module actions file, 
  * this function will return a boolean value. 
  * If a true value is returned, indicating the user is logged in, 
  * we update the isReady and isLoggedIn state variable values to true.
  * 
  * If a false value is returned, indicating no user is currently logged in, 
  * we update the isReady state variable value to true 
  * and the isLoggedIn state variable value to false.
  * 
  * Our render function renders the Splash scene while the isReady state variable is false, 
  * this scene consists of a View and and ActivityIndicator, 
  * this scene remains visible until the isReady state variable changes to true, 
  * then our Router is rendered, 
  * the isLoggedIn state variable is used to determine which scene is to be set as the initial scene.
  * 
  * If the user is logged in (isLoggedIn = true), 
  * the Main scene is rendered else if the user is not logged in (isLoggedIn = false), 
  * the Auth scene is rendered.
  */

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "#fff"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                    </Stack>
                </Scene>
            </Router>
        )
    }
}