
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import styles from "./HomeStackPages.style";
import hotelService from '../../services/hotelService';
import { useCallback, useEffect, useState } from "react";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { useFocusEffect } from "@react-navigation/native";
const HomePage = ({ navigation }) => {
  const [carouselItems, setCarouselItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getHotelWithImages = () => {
    hotelService.getAllWithImages()
      .then((res) => {
        var active = res.data.data.filter((item) => item.status == true);
        const carouselItems = active.map((item) => {
          return {
            id: item.id,
            image: item.images[0],
            title: item.name,
          }
        })
        setCarouselItems(carouselItems);
      }).catch((err) => {
        console.log(err);
      })

  }

  useEffect(() => {
    getHotelWithImages()
  }, [])

  const onRefresh = () => {
    setRefreshing(true);
    getHotelWithImages();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [])
  );

  return (

    <>
      <HeaderComponent />
      {refreshing
        ? <>
          <View style={styles.errorContainer} >
            <ActivityIndicator size="large" color="#de2d5f" />
            <Text style={styles.errorContainerText}>Yükleniyor...</Text>
          </View>
        </>
        : <>
          <>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false}>
              <View style={{ ...styles.container }}>
                {carouselItems && <CarouselComponent data={carouselItems} navigation={navigation} navigatePage={"HotelDetailPage"} />}
              </View>
            </ScrollView>
          </>
        </>
      }
    </>
  );
}

export default HomePage;
