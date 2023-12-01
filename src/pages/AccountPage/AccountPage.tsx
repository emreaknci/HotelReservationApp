
import { View, Text } from "react-native";
import styles from "./AccountPage.style";
import RegisterPage from "./RegisterPage";

const AccountPage = () => {
  return (
    <>
      <View style={styles.container} >
        <RegisterPage />
      </View>
    </>
  );
}

export default AccountPage;
