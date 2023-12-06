
import { View, Text } from "react-native";
import styles from "./HomeStackPages.style";
import { AuthContext } from '../../context/AuthContext';
import hotelService from '../../services/hotelService';
import { useEffect, useState, useContext } from "react";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [hotels, setHotels] = useState(null);
  const [carouselItems, setCarouselItems] = useState(null);
  useEffect(() => {
    hotelService.getAllWithImages()
      .then((res) => {
        setHotels(res.data.data);
        const carouselItems = res.data.data.map((item) => {
          return {
            id: item.id,
            image: item.images[0]
          }
        })
        setCarouselItems(carouselItems);
      })
  }, [])

  return (
    <>
      <View style={{ ...styles.container }}>
        {/* <Text>HomePage</Text>
        <Text>UserName: {authContext.user?.id}</Text> */}
        <CarouselComponent data={carouselItems} />
      </View>
    </>
  );
}

export default HomePage;
