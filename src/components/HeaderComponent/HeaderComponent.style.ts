
import { StyleSheet } from 'react-native';
import baseStyles from "../../../styles"
import colors from "../../../colors"

export default StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: baseStyles.bgColor.backgroundColor,
        paddingTop: 25,
        paddingBottom: 10,
    },
    headerText: {
        ...baseStyles.textColor,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 8,
        color: colors.text,
    },
});