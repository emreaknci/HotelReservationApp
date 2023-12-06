
import { StyleSheet } from 'react-native';
import mainStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
    container: {
        ...mainStyles.container,
        backgroundColor: colors.primary,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
        paddingBottom: 0
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 5,
        color: "white",
        backgroundColor: colors.primary,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    infoText: {
        fontSize: 18,
        textAlign: 'right',
        color: "white",
    },
    infoIcon:
    {
        fontSize: 24,
        color: "white",
    },
    roomContainer:
    {
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    roomImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    roomInfoContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
