
import { StyleSheet } from 'react-native';
import colors from "../../../../../colors";
export default StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        padding: 20,
    },
    infoContainer: {
        borderRadius: 50,
        padding: 20,
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: "center",
        color: colors.text,
    },
    content: {
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-around",
        backgroundColor: colors.primary,
    },
    contentItem: {
        alignItems: 'center',
    },
    contentItemText: {
        fontSize: 16,
        color: colors.text,
    },
    icon: {
        fontSize: 30,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
