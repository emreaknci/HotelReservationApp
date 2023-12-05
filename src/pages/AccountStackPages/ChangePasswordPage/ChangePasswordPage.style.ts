
import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../colors';
import mainStyles from "../../../../styles"

export default StyleSheet.create({
    container: {
        ...mainStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primary,
        textAlign: 'center',
    },
});
