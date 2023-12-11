
import { StyleSheet } from 'react-native';
import baseStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
    container: {
        ...baseStyles.container
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
    roomContainer: {
        paddingVertical: 10,
    },
    roomCard: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: 10,
    },
    roomInfoContainer: {
        paddingHorizontal: 10
    },
    roomCardHeader: {
        marginVertical: 10
    },
    roomCardLine: {
        borderTopWidth: 2,
        borderTopColor: colors.primary,
    },
    roomCardHeaderText: {
        flexDirection: 'row',
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold'
    },
    roomCardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10
    },
    roomCardBodyText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold'
    },
    roomCardBodyButton: {
        backgroundColor: colors.primary,
        padding: 10,
        flex: 1,
        marginHorizontal: 1,
    },
    roomCardBodyButtonText: {
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
    roomCardBodyButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
});
