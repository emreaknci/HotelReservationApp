
import { View, Text, Button } from "react-native";
import styles from "./MyAccountPage.style";
import str from "../../../services/storageService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useToast } from "react-native-toast-notifications";
const MyAccountPage = ({ navigation }) => {
  const toast = useToast();
  const [userId, setUserId] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const navigate = async () => {
      await str.clearAsync();
      navigation.navigate("LoginPage");
    }

    const getUserId = async () => {
      const id = await str.getAsync("userId");
      setUserId(id);
    }

    if (!authContext.isAuthenticated) {
      navigate();
    }
    else
      getUserId();
  }, [authContext.isAuthenticated]);

  const logout = async () => {
    await authContext.logOut();
    navigation.navigate("LoginPage");
    toast.show("Çıkış Başarılı!", {
      type: "custom_type",
      animationDuration: 300,
      placement: "center",
      animationType: "zoom-in",
      data: {
        color: "green",
      },
      style: {
        borderColor: "green",
      },
      swipeEnabled: true,
    });
  }
  return (
    <View style={styles.container}>
      <Text>UserId: {userId} </Text>
      <Button title="çıkış yap" onPress={() => logout()} />
    </View>
  );
}

export default MyAccountPage;
