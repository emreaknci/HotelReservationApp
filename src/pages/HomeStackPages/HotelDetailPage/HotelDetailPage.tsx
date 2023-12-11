import { View, Text, TouchableOpacity, RefreshControl, FlatList, Image } from "react-native";
import styles from "./HotelDetailPage.style";
import HotelService from './../../../services/hotelService';
import { useCallback, useEffect, useState } from "react";
import HotelDetailDto from './../../../types/hotels/hotelDetailDto';
import CarouselComponent, { CarouselItem } from './../../../components/CarouselComponent/CarouselComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RoomDetailDto from '../../../types/rooms/roomDetailDto';
import { useFocusEffect } from "@react-navigation/native";

const HotelDetailPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [hotel, setHotel] = useState<HotelDetailDto>(null);
  const [hotelCarouselItems, setHotelCarouselItems] = useState<CarouselItem[]>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getHotelWithImages = () => {
    HotelService.getByIdWithImages(id)
      .then(response => {
        response.data.data.rooms = response.data.data.rooms && response.data.data.rooms.filter(room => room.status === true);
        setHotel(response.data.data)
        setHotelCarouselItems(response.data.data.images.map((image) => {
          return { image: image }
        }))
      })
      .catch(error => console.log(error.response));
  }

  useFocusEffect(
    useCallback(() => {
      getHotelWithImages()
    }, [])
  );

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
          <Text style={{ ...styles.text, fontSize: 24, fontWeight: "bold" }}>{item.name}</Text>
        </View>
        <Image style={styles.roomImage}
          source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${item.images[0]}` }} />
        <TouchableOpacity activeOpacity={0.8} style={{ ...styles.roomInfoContainer, marginVertical: 2 }} onPress={() => navigateToPage(item.id, item.name)}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons name="arrow-right-bold-circle" size={40} />
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
              {hotel?.description && <TouchableOpacity activeOpacity={1} onPress={toggleDescription}>
                <Text style={styles.text}>{getDescriptionToShow()}</Text>
              </TouchableOpacity>}
              {hotel?.phone && <View style={styles.infoContainer}>
                {renderStars(hotel?.star)}
                <Text style={styles.text}>{hotel?.star}/10</Text>
                <MaterialCommunityIcons name="phone" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.phone}</Text>
              </View>}
              {hotel?.address && <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="map-marker" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.address}</Text>
              </View>}
              {hotel?.email && <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="email" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.email}</Text>
              </View>}
              {hotel?.website && <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="web" style={styles.infoIcon} />
                <Text style={styles.infoText}>{hotel?.website}</Text>
              </View>}
            </View>
            {(!hotel.rooms || hotel.rooms.length === 0 || !hotel.rooms.some(room => room.status === true)) &&
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="alert-circle-outline" style={{ ...styles.infoIcon, fontSize: 48 }} />
                <Text style={styles.text}>Otele ait oda bilgisi bulunmamaktadır.</Text>
              </View>
            }
          </>
        }
      </>
    );
  }

  return (
    <>
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
    </>
  );
}

export default HotelDetailPage;
