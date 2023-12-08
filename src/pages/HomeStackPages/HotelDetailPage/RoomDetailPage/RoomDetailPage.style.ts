
import { StyleSheet } from 'react-native';
import colors from "../../../../../colors";
export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
    infoContainer: {
        padding: 10,

    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: "center",
    },
    content: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-around",
    },
    contentItem: {
        alignItems: 'center',
    },
    contentItemText: {
        fontSize: 16,
        color: "black",
    },
    icon: {
        fontSize: 30,
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        alignSelf: 'center',
        width: '90%',
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
