
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './LoginPage.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthService from '../../../services/authService';
import { useToast } from 'react-native-toast-notifications';
import LoginDto from 'src/types/users/loginDto';
import StorageService from '../../../services/storageService';
import { AuthContext } from '../../../context/AuthContext';
import HeaderComponent from './../../../components/HeaderComponent/HeaderComponent';

const LoginPage = ({ navigation }) => {
  const toast = useToast();
  const authContext = useContext(AuthContext);

  const [loginData, setLoginData] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    validateRegisterData();
  }, [loginData]);

  const handleInputChange = (key, value) => {
    setLoginData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleRegisterPress = async () => {
    setLoading(true);
    if (!validateRegisterData()) {
      setLoading(false);
      return;
    }
    await AuthService.login(loginData)
      .then(async (res) => {
        StorageService.setAsync("token", res.data.data.token);
        StorageService.setAsync("userId", res.data.data.id);
        StorageService.setAsync("userEmail", res.data.data.email);
        StorageService.setAsync("userFullName", res.data.data.firstName + " " + res.data.data.lastName);
        StorageService.setAsync("userType", res.data.data.userType);
        StorageService.setAsync("tokenExpiration", res.data.data.expiration);
        await authContext.logIn();
        navigation.navigate('MyAccountPage');
        toast.show(res.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
        setLoading(false);
      }
      ).catch((err) => {
        toast.show(err.response.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          data: {
            title: "Hata!",
          },
          swipeEnabled: true,
        });
        setLoading(false);
      });
    setLoading(false);
  };

  const validateRegisterData = () => {
    const errors = {
      email: '',
      password: '',
    };


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email.trim()) {
      errors.email = 'Email alanı boş bırakılamaz';
    } else if (!emailRegex.test(loginData.email)) {
      errors.email = 'Geçerli bir email adresi girin';
    }

    if (!loginData.password.trim()) {
      errors.password = 'Şifre alanı boş bırakılamaz';
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const navigateToRegisterPage = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <>
      <HeaderComponent />
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {!loading ?
          <>
            <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
            <Text style={styles.title}>Giriş Yap</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email" style={styles.inputIcon} />
              <TextInput keyboardType='email-address' style={styles.input} placeholder={'Mail'} value={loginData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
              {errorMessages.email && <Text style={styles.errorText}>
                {errorMessages.email} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder={'Şifre'} value={loginData.password}
                secureTextEntry={true} onChangeText={(value) => handleInputChange('password', value)}
              />
              {errorMessages.password && <Text style={styles.errorText}>
                {errorMessages.password} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>

            <TouchableOpacity onPress={() => handleRegisterPress()}>
              <Text style={styles.button}> Giriş Yap </Text>
            </TouchableOpacity>

            <Text style={styles.footerText} onPress={navigateToRegisterPage}>Hesabın yok mu?</Text>
          </>
          :
          <>
            <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
            <Text style={styles.title}>Giriş Yap</Text>
            <Text style={styles.loadingText}>Giriş yapılıyor...</Text>
          </>
        }
      </ScrollView>

    </>
  );
}

export default LoginPage;
