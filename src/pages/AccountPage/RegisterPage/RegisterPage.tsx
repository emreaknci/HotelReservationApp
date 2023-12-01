import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterDto from '../../../types/users/registerDto';
import styles from './RegisterPage.style';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const renderInput = (formik: any) => {
    const keys = Object.keys(formik.values);

    return keys.map((key) => (
        <View key={key}>
            <CustomTextInput
                fieldName={key}
                handleOnChange={formik.handleChange}
                handleOnBlur={formik.handleBlur}
                value={formik.values[key]}
            />
            {formik.touched[key] && formik.errors[key] ? (
                <Text style={styles.errorText}>
                    <MaterialCommunityIcons name={"alert-circle-outline"}
                        color={styles.errorText.color} size={styles.errorText.fontSize} />
                    {formik.errors[key]}
                </Text>
            ) : null}
        </View>

    ));
};

const RegisterPage = () => {

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
        validateOnChange: false,
        onSubmit: (values: RegisterDto) => {

            console.log(values);
        },
    });



    return (
        <View style={styles.container}>
            <Text>Kayıt Ol</Text>
            {renderInput(formik)}
            <Button title="Register" onPress={() => formik.handleSubmit()} />
        </View>
    );
};

export default RegisterPage;