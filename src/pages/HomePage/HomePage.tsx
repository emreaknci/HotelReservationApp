
import { View, Text } from "react-native";
import styles from "./HomePage.style";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
const HomePage = () => {
  const authContext=useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        <Text>HomePage</Text>
        <Text>UserName: {authContext.user?.id}</Text>

      </View>
    </>
  );
}

export default HomePage;
