import React from 'react';
import PropTypes from 'prop-types'

import { Text, View } from 'react-native';
import { Header } from 'react-native-elements'

// import { isEmpty, validate } from '../../utils/validate'

import styles from "./styles"


class MainHeader extends React.Component {
    constructor(props) {
        super(props);

        const { name, color } = props;

        // this.state = this.createState(fields, error);

        // //bind functions
        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    // createState(fields, error) {
    //     //create the state
    //     const state = {};
    //     fields.forEach((field) => {
    //         let { key, type, value } = field;
    //         state[key] = { type: type, value: value };
    //     })

    //     state["error"] = error;
    //     return state;
    // }

    // onSubmit() {
    //     const data = this.state;
    //     const result = validate(data);

    //     if (!result.success) this.setState({ error: result.error });
    //     else this.props.onSubmit(this.extractData(data));
    // }

    // extractData(data) {
    //     const retData = {};

    //     Object.keys(data).forEach(function (key) {
    //         if (key !== "error") {
    //             let { value } = data[key];
    //             retData[key] = value;
    //         }
    //     });

    //     return retData;
    // }

    // onChange(key, text) {
    //     const state = this.state;
    //     state[key]['value'] = text;
    //     this.setState(state);
    // }

    render() {
        // const { fields, showLabel, buttonTitle, onForgotPassword } = this.props;

        return (
            <Header
                placement="left"
                outerContainerStyles={styles.center}
                leftComponent={{ icon: 'menu', color: this.props.color }}
                centerComponent={{ text: this.props.name, style: [styles.text] }}
                rightComponent={{ icon: 'home', color: this.props.color }}
            />
        );
    }
}

// Form.propTypes = {
//     // fields: PropTypes.object,
//     showLabel: PropTypes.bool,
//     buttonTitle: PropTypes.string,
//     onSubmit: PropTypes.func.isRequired,
//     error: PropTypes.object
// }


// Form.defaultProps = {
//     onForgotPassword: null,
// }


export default MainHeader;