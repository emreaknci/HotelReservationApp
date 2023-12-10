
import { StyleSheet } from 'react-native';
import mainStyles from "../../../../styles"
import colors from "../../../../colors"
export default StyleSheet.create({
  container: {
    ...mainStyles.container,
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
  errorContainerIcon: {
    color: colors.primary,
    fontSize: 75,
  },
  reservationContainer: {
  },
  reservationContainerButtonContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  reservationContainerButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,

  },
  reservationContainerButtonText: {
    color: colors.primary,
    textAlign: 'center',

  },
  reservationContainerActiveButton: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,    
  },
  reservationContainerActiveButtonText: {
    color: colors.text,
    textAlign: 'center',
  },
  reservationCard: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
    padding: 15,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  reservationCardHeader: {
    marginBottom: 10,
  },
  reservationCardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  reservationCardHeaderSubText: {
    color: colors.primary,
  },
  reservationCardBody: {},
  reservationCardBodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reservationCardBodyRowText: {
    fontSize: 16,
    color: colors.primary,

  },

});
