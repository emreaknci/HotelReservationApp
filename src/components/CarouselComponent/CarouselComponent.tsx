
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, Animated, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRef } from 'react';
import styles from "./CarouselComponent.style";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const WIDTH = Dimensions.get('window').width * 1;
const HEIGHT = Dimensions.get('window').height * 0.3;


const CarouselComponent = ({ data, navigation, navigatePage }: { data?: any, navigation?: any, navigatePage?: any }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const scrollAnimation = Animated.timing(scrollX, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    });
    const resetScrollAnimation = Animated.timing(scrollX, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    });
    const sequenceAnimation = Animated.sequence([scrollAnimation, resetScrollAnimation]);
    const loopAnimation: Animated.CompositeAnimation = Animated.loop(sequenceAnimation, { iterations: -1 });
    loopAnimation.start();
    return () => {
      loopAnimation.stop();
    };
  }, [scrollX]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = event.nativeEvent.contentOffset;
    const newIndex = Math.round(x / WIDTH);
    if (index !== newIndex) {
      setIndex(newIndex);
    }
  };

  const handlePress = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        animated: true,
        x: index * WIDTH,
      });
    }
  };

  const scrollToNextItem = () => {
    if (data) {
      const newIndex = (index + 1) % data.length;
      handlePress(newIndex);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(scrollToNextItem, 2000);

      return () => clearInterval(interval);
    }
  }, [index, data]);

  const navigateToPage = (item: any) => {
    navigation.navigate(navigatePage, { id: item.id, title: item.title });
  }

  return (
    <View style={{ ...styles.carousel }}>
      {data ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          decelerationRate={0}
        >
          {data.map((item, i) => (
            <TouchableOpacity activeOpacity={1} key={i} onPress={() => navigateToPage(item)}>
              <AnimatedImage
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${item.image}` }}
                style={{ width: WIDTH, height: HEIGHT }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CarouselComponent;
