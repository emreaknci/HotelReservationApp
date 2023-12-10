
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
        backgroundColor: colors.text,
        shadowColor: colors.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: "center",
        color: colors.primary,
    },
    content: {
        flexDirection: "row",
        paddingVertical: 20,
        justifyContent: "space-around",
        backgroundColor: colors.text,
    },
    contentItem: {
        alignItems: 'center',
    },
    contentItemText: {
        fontSize: 16,
        color: colors.primary,
    },
    icon: {
        fontSize: 30,
        color: colors.primary,
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
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
