
import { View, Text } from "react-native";
import styles from "./AdminPanelPage.style";
import StorageService from "../../services/storageService";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
const AdminPanelPage = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const getUserId = async () => {
    };
    getUserId();

  }, []);
  return (
    <>
      <View style={styles.container} >
        <Text>AdminPanelPage {authContext.user?.id}</Text>
      </View>
    </>
  );
}

export default AdminPanelPage;
