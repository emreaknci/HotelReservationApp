
import { View, Text } from "react-native";
import styles from "./ReservationStackPages.style";
import HeaderComponent from './../../components/HeaderComponent/HeaderComponent';

const ReservationPage = () => {
  return (
    <>
      <HeaderComponent />
      <View style={styles.container} >
        <Text>ReservationPage</Text>
      </View>
    </>
  );
}

export default ReservationPage;
