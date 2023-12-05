
import { View, Text } from "react-native";
import styles from "./AccountPage.style";
import RegisterPage from "./RegisterPage";

const AccountPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.container} >
        <RegisterPage navigation={navigation} />
      </View>
    </>
  );
}

export default AccountPage;
