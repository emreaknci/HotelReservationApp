
import { View, Text } from "react-native";
import styles from "./CheckBoxComponent.style";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from './../../../colors';

interface CheckBoxComponentProps {
  text?: string;
  onPress: () => void;
  isChecked: boolean;
  size?: number;
}
const CheckBoxComponent = ({ text, isChecked, onPress, size = 24 }: CheckBoxComponentProps) => {
  return (
    <View style={{ marginBottom: 10, padding: 10, justifyContent: "center" }}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }} onPress={onPress}>
        <MaterialCommunityIcons name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"} size={size} color={colors.primary} />
        {text && <Text style={{
          fontSize: size, textAlign: 'center',
          color: colors.primary, marginLeft: 8
        }}>
          {text}
        </Text>}
      </TouchableOpacity>
    </View>
  );
}

export default CheckBoxComponent;
