
import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../colors';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5, 
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primary,
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
        backgroundColor: colors.primary,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.8,
        textAlign: 'center',
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        paddingVertical: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.8,

    },
    inputIcon: {
        marginRight: 10,
        color: colors.primary,
        fontSize: 20,
        alignSelf: 'center',
    },
    input: {
        flex: 1,
        color: colors.inputText,
        fontSize: 16,
    },
    footerText: {
        fontSize: 12,
        color: colors.primary,
        textAlign: 'center',
        marginVertical: 10,
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
    loadingText: {
        color: colors.primary,
        fontSize: 20,
    }
});
