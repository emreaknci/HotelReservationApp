
import React from 'react'
import { TextInput } from 'react-native';
import styles from './CustomTextInput.style';
interface CustomTextInputProps {
  fieldName: string;
  style?: any;
  handleOnChange: (fieldName: string) => any;
  handleOnBlur: (fieldName: string) => any;
  value: string;
}
const CustomTextInput = (props: CustomTextInputProps) => {
  return (
    <TextInput
      placeholder={props.fieldName}
      onChangeText={(text) => props.handleOnChange(props.fieldName)(text)}
      onBlur={() => props.handleOnBlur(props.fieldName)}
      value={props.value}
      secureTextEntry={props.fieldName === 'password'}
      style={props.style ?? styles.input}
    />
  );
}

export default CustomTextInput
