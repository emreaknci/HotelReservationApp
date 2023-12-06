
import { View, Text } from "react-native";
import styles from "./HotelDetailPage.style";

const HotelDetailPage = ({ route }) => {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text>Hotel Detail Page {id} {title} </Text>
    </View>
  );
}

export default HotelDetailPage;
