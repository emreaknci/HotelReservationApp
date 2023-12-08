import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, Animated, FlatList, Dimensions } from "react-native";
import { useRef } from 'react';
import styles from "./CarouselComponent.style";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const WIDTH = Dimensions.get('window').width * 1;
const HEIGHT = Dimensions.get('window').height * 0.3;

export interface CarouselItem {
  id?: number;
  title?: string;
  image: string;
}

export interface CarouselComponentProps {
  data?: CarouselItem[];
  navigation?: any;
  navigatePage?: any;

}

const CarouselComponent = ({ data, navigation, navigatePage }: CarouselComponentProps) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateScroll = () => {
      const nextIndex = (index + 1) % data.length;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    };

    const interval = setInterval(animateScroll, 2000);

    return () => clearInterval(interval);
  }, [index, data]);

  const navigateToPage = (item: any) => {
    if (navigatePage && item.id)
      navigation.navigate(navigatePage, { id: item.id, title: item.title });
  }

  const flatListRef = useRef<FlatList>(null);

  return (
    <View style={{ ...styles.carousel }}>
      {data ? (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item) => item.image}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          initialScrollIndex={index}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / WIDTH);
            if (index !== newIndex) {
              setIndex(newIndex);
            }
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={1} key={index} onPress={() => navigateToPage(item)}>
              <AnimatedImage
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${item.image}` }}
                style={{ width: WIDTH, height: HEIGHT }}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default CarouselComponent;