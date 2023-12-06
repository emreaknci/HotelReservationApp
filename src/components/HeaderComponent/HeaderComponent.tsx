
import { View, Text } from "react-native";
import styles from "./HeaderComponent.style";

const HeaderComponent = () => {
  return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Otel Rezervasyon</Text>
      </View>
  );
}

export default HeaderComponent;
