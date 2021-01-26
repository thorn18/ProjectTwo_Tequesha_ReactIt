import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const threadtablestyle = StyleSheet.create({
    threadCardContainer: {
        // perfectSize is only going to call when the app is first loaded in the device.
        position:'relative',
        marginLeft:'auto',
        marginRight:'auto',
        width: perfectSize(900),
        height: perfectSize(200),
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: perfectSize(4),
        textAlign:'center',
        backgroundColor:'white',
        color:'black',
    },


});

export default threadtablestyle;