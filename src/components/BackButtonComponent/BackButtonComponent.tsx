import React from "react";
import { View, Animated } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../../../colors";

const BackButtonComponent = () => {
  const navigation = useNavigation();
  const scaleValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      useNativeDriver: true,
      speed: 10,
      toValue: 1,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      useNativeDriver: true,
      speed: 10,
      toValue: 1,
    }).start(() => {
      navigation.goBack();
    });
  };

  return (
    <TouchableHighlight
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      underlayColor="rgba(0,0,0, 0.1)"
      style={{
        borderRadius: 50,
        marginLeft: 6,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
          borderRadius: 50,
          padding: 8,
          backgroundColor: "transparent",
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.text}
        />
      </Animated.View>
    </TouchableHighlight>
  );
};

export default BackButtonComponent;
