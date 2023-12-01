import { StyleSheet,Dimensions } from 'react-native';
const {width,height} = Dimensions.get('window');
export default StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#e0e0e0",
        color: "black",    
        height:"auto",
        width: width * 0.8,

    },
});