import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    left: {
        color: "#fff"
    },

    text: {
        color: color.white,
    },

    center: {
        backgroundColor: color.main,
    },


});


export default styles;