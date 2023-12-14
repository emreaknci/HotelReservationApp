
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styles from "./ChangePasswordPage.style";
import { useState } from 'react';
import userService from "../../../services/userService";
import storageService from "../../../services/storageService";
import { useToast } from "react-native-toast-notifications";
import ChangeUserPasswordDto from "src/types/users/changeUserPasswordDto";
import { useContext } from 'react';
import { AuthContext } from './../../../context/AuthContext';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChangePasswordPage = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState<ChangeUserPasswordDto>({
    id: userId,
    oldPassword: '',
    newPassword: '',
  });

  const authContext = useContext(AuthContext);

  const [errorMessages, setErrorMessages] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const getCurrentUserId = async () => {
    var currentUserId = await storageService.getAsync("userId");
    setUserId(currentUserId);
    setData((prevData) => ({ ...prevData, id: currentUserId }));
  }
  useEffect(() => {
    getCurrentUserId();
  }, []);

  useEffect(() => {
    validateData();
  }, [data]);

  const validateData = () => {

    let currentPasswordError = '';
    let newPasswordError = '';

    if (!data.oldPassword) {
      currentPasswordError = 'Mevcut şifrenizi giriniz.';
    }

    if (!data.newPassword) {
      newPasswordError = 'Yeni şifrenizi giriniz.';
    }

    return true;
  }

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };


  const handlePress = async () => {
    if (!validateData())
      return;

    setLoading(true);
    await userService.changePassword(data)
      .then((res) => {
        toast.show("Şifre değiştirildi, lütfen tekrar giriş yapınız.", {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
        authContext.logOut();
        navigation.navigate('LoginPage');
      })
      .catch((err) => {
        console.log(err.response.data)
        toast.show(err.response.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (

    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {!loading ?
            <>
              <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
              <Text style={styles.title}>Şifre Değiştir</Text>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder={'Eski Şifre'} value={data.oldPassword}
                  secureTextEntry={true} onChangeText={(value) => handleInputChange('oldPassword', value)}
                />
                {errorMessages.oldPassword && <Text style={styles.errorText}>
                  {errorMessages.oldPassword} <MaterialCommunityIcons
                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
              </View>

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder={'Yeni Şifre'} value={data.newPassword}
                  secureTextEntry={true} onChangeText={(value) => handleInputChange('newPassword', value)}
                />
                {errorMessages.newPassword && <Text style={styles.errorText}>
                  {errorMessages.newPassword} <MaterialCommunityIcons
                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                }
              </View>

              <TouchableOpacity onPress={() => handlePress()}>
                <Text style={styles.button}>Şifreyi Değiştir</Text>
              </TouchableOpacity>
            </>
            : <View style={styles.container}>
              <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
              <Text style={styles.title}>Giriş Yap</Text>
              <Text style={styles.loadingText}>Giriş yapılıyor...</Text>
            </View>
          }
        </ScrollView>

      </View>
    </>
  );
}

export default ChangePasswordPage;
