
import { StyleSheet } from 'react-native';
import mainStyles from "../../../styles"
import colors from '../../../colors';

export default StyleSheet.create({
    container: {
        ...mainStyles.container,
    },
    adminInfoHeader:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    adminInfoHeaderText:{
        fontSize: 10,
        color: "black",
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.primary,
        width: '95%',
        alignSelf: 'center',

    },
    menuIcon: {
        fontSize: 24,
        marginRight: 12,
        color: colors.primary,
    },
    menuText: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    headerIcon: {
        color: colors.primary,
        fontSize: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.primary,
        textAlign: 'center',
    },
    subMenu: {
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },
    subMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    subMenuIcon: {
        fontSize: 20,
        marginRight: 8,
        color: colors.primary,
    },
    subMenuText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
});
