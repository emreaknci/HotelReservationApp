
import { StyleSheet } from 'react-native';
import baseStyles from '../../../../styles';
import colors from "../../../../colors"
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        ...baseStyles.container,

    },
    stepTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    stepText: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.primary,
        width: 50,
        height: 50,
        textAlign: "center",
        lineHeight: 50,
        fontWeight: "bold",
    },
    stepLine: {
        height: 1,
        width: 75,
        backgroundColor: colors.primary,
    },
    stepTextConfirmed: {
        backgroundColor: colors.primary,
        color: colors.text,
    },
    stepTextCurrent: {
        backgroundColor: colors.secondary,
        color: colors.text,
    },
    stepTextUnconfirmed: {
        backgroundColor: colors.text,
        color: colors.primary,
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 10,
        margin: 10,
        marginRight: 0,
        width: "40%",
    },
    buttonContainerText: {
        color: colors.primary,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        paddingVertical: 10,
        marginBottom: 10,
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
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    infoText: {
        color: colors.primary,
        fontSize: 16,
    },
    reservationInfoContainer: {
        justifyContent: "space-between",
        padding: 30,
    },
    reservationInfoText: {
        fontSize: 18,        
        color: colors.primary,
    }
});
