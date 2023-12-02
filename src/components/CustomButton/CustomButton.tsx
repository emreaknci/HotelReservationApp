
import { TouchableOpacity, Text } from "react-native";
import styles from "./CustomButton.style";
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}
const CustomButton = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>);
}

export default CustomButton;
