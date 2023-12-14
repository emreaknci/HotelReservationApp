
import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import styles from "./HotelsPage.style";
import { useEffect, useState } from 'react';
import HotelService from './../../../services/hotelService';
import HotelDetailDto from './../../../types/hotels/hotelDetailDto';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

const HotelsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<HotelDetailDto[]>(null);
  const [filteredHotels, setFilteredHotels] = useState<HotelDetailDto[]>(null);
  const [searchText, setSearchText] = useState("");
  const [hotelId, setHotelId] = useState(0);

  const getHotels = () => {
    setLoading(true);
    HotelService.getAllWithImages()
      .then((response) => {
        const hotels = response.data.data;
        const activeHotels = hotels.filter(hotel => hotel.status);
        setHotels(activeHotels)
        setFilteredHotels(activeHotels)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useFocusEffect(
    useCallback(() => {
      getHotels();
    }, [])
  );
  useEffect(() => {
    if (!hotels) return;

    if (searchText === "") {
      setFilteredHotels(hotels);
      return;
    }

    const filteredHotels = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchText.toLowerCase()) ||
      hotel.country.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredHotels(filteredHotels);
  }, [searchText, hotels]);
  const navigateToHotelDetailPage = (hotelId: number, hotelName: string) => {
    navigation.navigate("HotelDetailPage", { id: hotelId, title: hotelName });
  }
  const renderHotelCard = (hotel: HotelDetailDto) => {
    return (
      <>
        <View style={styles.hotelCard}>
          <View style={styles.hotelInfoContainer}>
            <View style={styles.hotelCardHeader}>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Otel Adı:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.name}</Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Ülke:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.country}</Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Şehir:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.city}</Text>
              </View>
            </View>
          </View>

          <View style={styles.userCardBodyButtonContainer}>
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.userCardBodyButton }}
              onPress={() => navigateToHotelDetailPage(hotel.id, hotel.name)}
            >
              <Text style={styles.userCardBodyButtonText}>Detay Sayfasına Git</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  return (
    <>
      {loading ?
        <>
          <View style={styles.errorContainer} >
            <ActivityIndicator size="large" color="#de2d5f" />
            <Text style={styles.errorContainerText}>Yükleniyor...</Text>
          </View>
        </>
        : <>
          {hotels ?
            <View style={styles.container}>
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Ara..." />
              </View>
              <FlatList
                data={filteredHotels}
                renderItem={({ item: hotel }) => (renderHotelCard(hotel))}
                keyExtractor={(hotel) => hotel.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.hotelContainer} />
              
            </View> :
            <>
              <View style={styles.errorContainer} >
                <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                <Text style={styles.errorContainerText}>Otel kaydı bulunamadı.</Text>
              </View>
            </>}
        </>}
    </>
  );
}

export default HotelsPage;
