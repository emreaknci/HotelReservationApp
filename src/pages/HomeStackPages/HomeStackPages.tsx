
import { View, Text, ScrollView, RefreshControl } from "react-native";
import styles from "./HomeStackPages.style";
import hotelService from '../../services/hotelService';
import { useEffect, useState } from "react";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
const HomePage = ({ navigation }) => {

  const [carouselItems, setCarouselItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getHotelWithImages = () => {
    hotelService.getAllWithImages()
      .then((res) => {
        const carouselItems = res.data.data.map((item) => {
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


  return (

    <>
      <HeaderComponent />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={{ ...styles.container }}>
          <CarouselComponent data={carouselItems} navigation={navigation} navigatePage={"HotelDetailPage"} />
        </View>
      </ScrollView>
    </>
  );
}

export default HomePage;
