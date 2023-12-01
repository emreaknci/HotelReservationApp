
import { StyleSheet,Dimensions } from 'react-native';
const {width,height} = Dimensions.get('window');
export default StyleSheet.create({
    errorText: {
        color: 'red',
        marginHorizontal:10,
        marginVertical: 5,
        fontSize: 10,
        backgroundColor: 'black',
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    
});
  