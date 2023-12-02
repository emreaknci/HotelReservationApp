import React from 'react';
import { View, Text } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterPage.style';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../../components/CustomButton';
import authService from '../../../services/authService';
import RegisterDto from '../../../types/users/registerDto';
import { useToast } from 'react-native-toast-notifications';

const renderInput = (formik: any) => {
    const keys = Object.keys(formik.values);

    return keys.map((key) => (
        <View key={key} >
            <CustomTextInput
                fieldName={key}
                handleOnChange={formik.handleChange}
                handleOnBlur={formik.handleBlur}
                value={formik.values[key]}
            />
            {formik.touched[key] && formik.errors[key] ? (
                <Text style={styles.errorText}>
                    <MaterialCommunityIcons name={"alert-circle-outline"}
                        color={styles.errorText.color} size={styles.errorText.fontSize} /> {formik.errors[key]}
                </Text>
            ) : null}
        </View>

    ));
};

const RegisterPage = () => {
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values: RegisterDto) => {
            const res = await authService.registerForCustomer(values);
            if (!res.success) {
                toast.show(res.message, {
                    type: 'danger', placement: 'center',
                    dangerColor: 'red',
                    icon: <MaterialCommunityIcons name={"alert-circle-outline"} color={"white"} size={30} />,
                    animationType: 'zoom-in',
                });
            }
            else {
                toast.show(res.message, {
                    type: 'success', placement: 'center',
                    successColor: 'green',
                    icon: <MaterialCommunityIcons name={"check-circle-outline"} color={"white"} size={30} />,
                    animationType: 'zoom-in',
                });
            }
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kayıt Ol</Text>
            {renderInput(formik)}
            <CustomButton title="Register" onPress={() => formik.handleSubmit()} color='red' />
        </View>
    );
};
export default RegisterPage;