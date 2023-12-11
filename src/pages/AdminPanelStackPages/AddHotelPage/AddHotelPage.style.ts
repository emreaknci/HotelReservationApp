import { StyleSheet } from 'react-native';
import baseStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
    container: {
        ...baseStyles.container,
    },
    errorContainer: {
        ...baseStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainerText: {
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center',
    },
    errorContainerIcon: {
        color: colors.primary,
        fontSize: 75,
        alignContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        justifyContent: 'space-around',

    },
    inputIcon: {
        color: colors.primary,
        fontSize: 20,
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 20,
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
    },
    errorIcon: {
        marginRight: 10,
        color: colors.primary,
        fontSize: 12,
        alignSelf: 'center',
    },

});
