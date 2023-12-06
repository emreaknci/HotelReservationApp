
import { View, Text, Image } from "react-native";
import styles from "./HeaderComponent.style";

const HeaderComponent = () => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>TRIVAGO</Text>
      {/* <Image style={styles.headerImage} source={require("../../assets/splash_image.png")} /> */}
    </View>
  );
}

export default HeaderComponent;
