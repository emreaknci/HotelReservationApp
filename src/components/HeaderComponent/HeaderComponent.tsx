
import { View, Text, Image } from "react-native";
import styles from "./HeaderComponent.style";

const HeaderComponent = () => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>HOTEL CLOUD</Text>
    </View>
  );
}

export default HeaderComponent;
