import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './RegisterPage.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegisterDto from '../../../types/users/registerDto';
import AuthService from '../../../services/authService';
import { useToast } from 'react-native-toast-notifications';


const RegisterPage = ({ navigation }) => {
    const toast = useToast();

    const [registerData, setRegisterData] = useState<RegisterDto>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        validateRegisterData();
    }, [registerData]);

    const handleInputChange = (key, value) => {
        setRegisterData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleRegisterPress = async () => {
        setLoading(true);
        if (!validateRegisterData()) {
            setLoading(false);
            return;
        }
        console.log("registerData: ", registerData)
        await AuthService.registerForCustomer(registerData)
            .then((res) => {
                toast.show(res.data.message, {
                    type: "custom_type",
                    placement: "center",
                    animationType: "zoom-in",
                    data: {
                        title: "Başarılı!",
                        color: "green",
                    },
                    style: {
                        borderColor: "green",
                    },
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };

        if (!registerData.firstName.trim()) {
            errors.firstName = 'Ad alanı boş bırakılamaz';
        }

        if (!registerData.lastName.trim()) {
            errors.lastName = 'Soyad alanı boş bırakılamaz';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!registerData.email.trim()) {
            errors.email = 'Email alanı boş bırakılamaz';
        } else if (!emailRegex.test(registerData.email)) {
            errors.email = 'Geçerli bir email adresi girin';
        }

        if (registerData.password.length < 6) {
            errors.password = 'Şifre en az 6 karakter olmalıdır';
        } else if (!registerData.password.trim()) {
            errors.password = 'Şifre alanı boş bırakılamaz';
        }

        setErrorMessages(errors);
        return Object.values(errors).every((error) => error === '');
    };

    const navigateToLoginPage = () => {
        navigation.navigate('LoginPage');

    };

    return (

        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {!loading ?
                    <>
                        <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
                        <Text style={styles.title}>Kayıt Ol</Text>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="account" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder={'Ad'} value={registerData.firstName}
                                onChangeText={(value) => handleInputChange('firstName', value)}

                            />
                            {errorMessages.firstName && <Text style={styles.errorText}>
                                {errorMessages.firstName} <MaterialCommunityIcons
                                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="account" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder={'Soyad'} value={registerData.lastName}
                                onChangeText={(value) => handleInputChange('lastName', value)}
                            />
                            {errorMessages.lastName && <Text style={styles.errorText}>
                                {errorMessages.lastName} <MaterialCommunityIcons
                                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="email" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder={'Mail'} value={registerData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                            />
                            {errorMessages.email && <Text style={styles.errorText}>
                                {errorMessages.email} <MaterialCommunityIcons
                                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="lock" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder={'Şifre'} value={registerData.password}
                                secureTextEntry={true} onChangeText={(value) => handleInputChange('password', value)}
                            />
                            {errorMessages.password && <Text style={styles.errorText}>
                                {errorMessages.password} <MaterialCommunityIcons
                                    name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                            }
                        </View>

                        <TouchableOpacity onPress={() => handleRegisterPress()}>
                            <Text style={styles.button}> Kayıt Ol </Text>
                        </TouchableOpacity>

                        <Text style={styles.footerText} onPress={navigateToLoginPage}>Zaten bir hesabın var mı?</Text>
                    </>
                    : <View style={styles.container}>
                        <MaterialCommunityIcons name="account-circle" style={[styles.inputIcon, { fontSize: 100 }]} />
                        <Text style={styles.title}>Kayıt Ol</Text>
                        <Text style={styles.loadingText}>Kayıt olunuyor...</Text>
                    </View>
                }
            </ScrollView>

        </View>

    );
};

export default RegisterPage;