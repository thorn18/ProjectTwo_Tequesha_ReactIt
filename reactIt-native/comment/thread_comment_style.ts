import { StyleSheet } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const threadtablestyle = StyleSheet.create({
    card: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'sans',
        borderWidth: 4,
        borderStyle: "inset",
        height: "fitcontent",
        backgroundColor: "white",

    },
    title: {
        textTransform: 'capitalize',
        textAlign: "center",
        fontSize: 32,
        color: "lime",
        backgroundColor: "navy",
    },
    replies: {
        color: "green",
        fontSize: perfectSize(35),
        fontWeight: "bold",
        textAlign: "left",

    },
    text: {
        color: "green",
        fontSize: perfectSize(30),
        fontWeight: "bold",
        textAlign: "center",

    },
    body: {
        color: "black",
        fontSize: perfectSize(30),
        textAlign: "left",
        paddingLeft: perfectSize(45),
        backgroundColor: "white",
        height: "fitcontent",
        paddingBottom: perfectSize(25),
        borderStyle: "inset",
        borderWidth: 3,
        borderRadius: 3,
        position: "relative",
        width: 1400,
        left: 100,

    },
    container: {
        borderStyle: "dashed",
        borderColor: "yellow",
        borderWidth: 5,
        color: "white",
    },
    highlight: {
        borderStyle: "inset",
        borderColor: "red",
        borderWidth: 3,
        position: "relative",
        left: 1640,
        down: 500,
        width: 25,
        height: 30,
        fontSize: 30,
        color: "red",
    },
    h2: {
        position: "relative",
        textalign: "center",
        fontSize: 20,
        color: "red",
        textAlign: "center",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    add: {
        backgroundColor:"white",
        borderStyle:"inset",
        borderWidth: 2,
        borderColor:"black",
        fontSize:16,
        fontWeight:"bold",
    },



});

export default threadtablestyle;