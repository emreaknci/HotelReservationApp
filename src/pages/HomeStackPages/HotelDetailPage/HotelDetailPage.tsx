
import { View, Text, TouchableOpacity, RefreshControl, FlatList, Image } from "react-native";
import styles from "./HotelDetailPage.style";
import HotelService from './../../../services/hotelService';
import { useEffect, useState } from "react";
import HotelDetailDto from './../../../types/hotels/hotelDetailDto';
import CarouselComponent, { CarouselItem } from './../../../components/CarouselComponent/CarouselComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RoomDetailDto from '../../../types/rooms/roomDetailDto';

const HotelDetailPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [hotel, setHotel] = useState<HotelDetailDto>(null);
  const [hotelCarouselItems, setHotelCarouselItems] = useState<CarouselItem[]>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getHotelWithImages = () => {
    HotelService.getByIdWithImages(id)
      .then(response => {
        setHotel(response.data.data)
        setHotelCarouselItems(response.data.data.images.map((image) => {
          return { image: image }
        }))
      })
      .catch(error => console.log(error.response));
  }

  useEffect(() => {
    getHotelWithImages()
  }, [id]);


  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const getDescriptionToShow = () => {
    if (showFullDescription) {
      return hotel?.description;
    } else {
      const description = hotel?.description.slice(0, 200);
      return description.length < hotel?.description.length
        ? `${description}... Devamını Görmek İçin Tıklayın`
        : description;
    }
  };

  const renderStars = (star) => {
    const totalStars = 5;
    const fullStars = Math.floor(star / 2);
    const hasHalfStar = star % 2 !== 0;

    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <MaterialCommunityIcons key={i} name="star" style={styles.infoIcon} />
      );
    }

    if (hasHalfStar) {
      starIcons.push(
        <MaterialCommunityIcons key="half" name="star-half-full" style={styles.infoIcon} />
      );
    }

    const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          style={styles.infoIcon}
        />
      );
    }

    return <View style={styles.infoContainer}>{starIcons}</View>;
  };
  const onRefresh = () => {
    setRefreshing(true);
    getHotelWithImages()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const navigateToPage = (id, title) => {
    navigation.navigate("RoomDetailPage", { id: id, title: title });
  }
  const roomRenderItem = ({ item }: { item: RoomDetailDto }) => {
    return (
      <View style={styles.roomContainer}>
        <View style={styles.roomInfoContainer}>
          <Text style={{ ...styles.text, fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        </View>
        <Image style={styles.roomImage}
          source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${item.images[0]}` }} />
        <TouchableOpacity activeOpacity={0.8} style={styles.roomInfoContainer} onPress={() => navigateToPage(item.id, item.name)}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons name="arrow-right-bold-circle" size={24} />
          </Text>
        </TouchableOpacity>
      </View>

    );
  }

  const renderHeader = () => {

    return (
      <>
        {hotel &&
          <>
            <CarouselComponent data={hotelCarouselItems} navigation={navigation} />
            <View style={styles.container}>
              <TouchableOpacity activeOpacity={1} onPress={toggleDescription}>
                <Text style={styles.text}>{getDescriptionToShow()}</Text>
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                {renderStars(hotel?.star)}
                <Text style={styles.text}>{hotel?.star}/10</Text>
                <MaterialCommunityIcons name="phone" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.phone}</Text>
              </View>
              <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="map-marker" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.address}</Text>
              </View>
              <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="email" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.email}</Text>
              </View>
              <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="web" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.website}</Text>
              </View>


            </View>
          </>
        }
      </>
    );
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
      data={hotel ? hotel.rooms : []}
      ListHeaderComponent={renderHeader}
      renderItem={roomRenderItem}
      keyExtractor={(option) => option.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

export default HotelDetailPage;
