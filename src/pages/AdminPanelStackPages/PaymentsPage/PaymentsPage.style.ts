
import { StyleSheet } from 'react-native';
import colors from '../../../../colors';
import baseStyles from '../../../../styles';
export default StyleSheet.create({
    container: {
        ...baseStyles.container,
    },
    buttonContainer: {
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 5,
        paddingTop: 10,
    },
    buttonContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttonContainerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        width: '50%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 10,
        justifyContent: 'space-between',
        margin: 5,
        width: '45%',
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputIcon: {
        color: colors.primary,
        fontSize: 20,
        marginHorizontal: 10,
    },
    input: {
        fontSize: 20,
        backgroundColor: 'transparent',
        width: '100%',
    },
    searchButton: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
        padding: 10,
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
    paymentContainer: {
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
});
