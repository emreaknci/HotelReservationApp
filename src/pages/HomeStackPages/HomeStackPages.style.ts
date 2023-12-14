
import { StyleSheet } from 'react-native';
import mainStyles from "../../../styles"
import colors from './../../../colors';
export default StyleSheet.create({
    mainContainer: {
        ...mainStyles.container,
        padding: 0
    },
    errorContainer: {
        ...mainStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainerText: {
        fontSize: 20,
        color: colors.primary,
        textAlign: 'center',
    },
    container: {
        backgroundColor: colors.text,
        borderRadius: 10,
        paddingVertical: 10,
        margin: 15,
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    containerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10,
    },
    itemContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    itemContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    itemContainerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    itemContainerImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',

    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: colors.text,
    },
});
