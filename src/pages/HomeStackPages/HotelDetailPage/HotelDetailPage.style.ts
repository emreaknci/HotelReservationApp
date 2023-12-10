
import { StyleSheet } from 'react-native';
import mainStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
    container: {
        ...mainStyles.container,
        backgroundColor: colors.text,
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 10,
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
        textAlign: 'justify',
        color: colors.primary,
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
        color: colors.primary,
    },
    infoIcon:
    {
        fontSize: 24,
        color: colors.primary,
    },
    roomContainer:
    {
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 10,
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
    roomImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    roomInfoContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText:
    {
      fontSize: 18,
      color: colors.primary,
    },
});
