
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18
    },
    button: {
        borderRadius: 5,
        marginHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18
    }
});
