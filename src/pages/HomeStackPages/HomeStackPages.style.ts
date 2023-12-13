
import { StyleSheet } from 'react-native';
import mainStyles from "../../../styles"
import colors from './../../../colors';
export default StyleSheet.create({
    container: {
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
});
