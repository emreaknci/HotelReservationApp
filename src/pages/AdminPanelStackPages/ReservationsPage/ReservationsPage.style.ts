
import { StyleSheet } from 'react-native';
import baseStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
    container: {
        ...baseStyles.container
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: colors.primary,
    },
    searchIcon: {
        color: colors.primary,
        fontSize: 20,
    },
    reservationContainer: {
        paddingVertical: 10,
    },
    reservationCard: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: 10,
    },
    reservationInfoContainer:{
        paddingHorizontal: 10
    },
    reservationCardHeader: {
        marginVertical: 10
    },
    reservationCardLine: {
        borderTopWidth: 2,
        borderTopColor: colors.primary,
    },
    reservationCardHeaderText: {
        flexDirection: 'row',
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold'
    },
    reservationCardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10
    },
    reservationCardBodyText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold'
    },
    reservationCardBodyButton:{
        backgroundColor: colors.primary,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    reservationCardBodyButtonText:{
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
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
      errorContainerIcon: {
        color: colors.primary,
        fontSize: 75,
      },
});
