
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import styles from "./HomeStackPages.style";
import hotelService from '../../services/hotelService';
import { useCallback, useContext, useEffect, useState } from "react";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { useFocusEffect } from "@react-navigation/native";
import RoomService from './../../services/roomService';
import RoomDto from './../../types/rooms/roomDto';
import { FlatList } from "react-native";
import HotelDetailDto from "src/types/hotels/hotelDetailDto";
import HotelWithImageDto from './../../types/hotels/hotelWithImageDto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from './../../../colors';
import ReservationService from './../../services/reservationService';
import ReservationListDto from './../../types/reservations/reservationListDto';
import { AuthContext } from './../../context/AuthContext';
const HomePage = ({ navigation }) => {
  const [carouselItems, setCarouselItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState<RoomDto[]>(null);
  const [hotels, setHotels] = useState<HotelWithImageDto[]>(null);
  const [reservations, setReservations] = useState<ReservationListDto[]>(null);
  const authContext = useContext(AuthContext);
  const getHotelsWithFirstImage = () => {
    hotelService.getHotelsWithFirstImage(2)
      .then((res) => {
        const data = res.data.data;

        const halfLength = Math.ceil(data.length / 2);
        const hotelsData = data.slice(0, halfLength);
        const carouselData = data.slice(halfLength);

        setHotels(hotelsData);
        const carouselItems = carouselData.map((item) => {
          return {
            id: item.id,
            image: item.imagePath,
            title: item.name,
          };
        });
        setCarouselItems(carouselItems);
      }).catch((err) => {
        console.log(err);
      })
  }
  const getLatestRooms = () => {
    RoomService.getLatestRoomsPerHotel(5)
      .then((res) => {
        const data = res.data.data
        setRooms(data);

      }).catch((err) => {
        console.log(err);
      })
  }

  const getReservations = () => {
    ReservationService.getMyUpcomingBookings()
      .then((res) => {
        const data = res.data.data
        setReservations(data);
      }).catch((err) => {
        console.log(err.response.data);
      })
  }

  const onRefresh = () => {
    setRefreshing(true);
    getHotelsWithFirstImage();
    getLatestRooms()
    if (authContext.isAuthenticated) {
      getReservations()
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [])
  );

  const renderRooms = () => {

    const renderRoom = ({ item: room }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerColumn}>
          <View style={styles.itemContainerRow}>
            <Image
              style={styles.itemContainerImage}
              source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${room.imagePath}` }}
            />
          </View>
        </View>
        <View style={styles.itemContainerColumn}>
          <View style={styles.itemContainerRow}>
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => navigation.navigate('HotelDetailPage', { id: room.id, title: room.hotelName })}>


              <Text style={styles.titleText}> {room.hotelName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainerRow}>
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => navigation.navigate('RoomDetailPage', { id: room.id, title: room.name })}>
              <Text style={styles.text}> {room.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainerRow}>
            <Text style={styles.text}> ₺ {room.price}</Text>
          </View>
          <View style={styles.itemContainerRow}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}
              onPress={() => navigation.navigate('ReservationStack', {
                screen: 'BookingPage',
                params: { id: room.id, title: `Rezervasyon Yap` },
              })}>
              <Text style={styles.buttonText}>Rezervasyon Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.containerTitle}>Popüler Odalar</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={rooms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: room }) => (
            renderRoom({ item: room })
          )}
        />
      </View>
    )
  }

  const renderHotels = () => {

    const renderHotel = ({ item: hotel }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerColumn}>
          <View style={styles.itemContainerRow}>
            <Image
              style={styles.itemContainerImage}
              source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}${hotel.imagePath}` }}
            />
          </View>
        </View>
        <View style={styles.itemContainerColumn}>
          <View style={styles.itemContainerRow}>
            <Text style={styles.titleText}> {hotel.name}</Text>
          </View>
          <View style={styles.itemContainerRow}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}
              onPress={() => navigation.navigate('HotelDetailPage', { id: hotel.id, title: hotel.name })}>
              <Text style={styles.buttonText}>Detaylar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );

    return (
      <View style={styles.container}>
        <Text style={styles.containerTitle}>Popüler Oteller</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={hotels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: hotel }) => (
            renderHotel({ item: hotel })
          )}
        />
      </View>
    )
  }

  const renderReservations = () => {

    const renderReservation = ({ item: reservation }: { item: ReservationListDto }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerColumn}>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-end' }} >
            <Text style={styles.titleText}>Otel:</Text>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-end' }} >
            <Text style={styles.titleText}>Oda:</Text>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-end' }} >
            <Text style={styles.titleText}>Giriş Tarihi:</Text>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-end' }} >
            <Text style={styles.titleText}>Çıkış Tarihi:</Text>
          </View>
        </View>

        <View style={styles.itemContainerColumn}>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-start' }} >
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => navigation.navigate('HotelDetailPage', { id: reservation.hotelId, title: reservation.hotelName })}>
              <Text style={styles.text}> {reservation.hotelName}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-start' }} >
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => navigation.navigate('RoomDetailPage', { id: reservation.roomId, title: reservation.roomName })}>
              <Text style={styles.text}> {reservation.roomName}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-start' }} >
            <Text style={styles.text}>{reservation.checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View style={{ ...styles.itemContainerRow, justifyContent: 'flex-start' }} >
            <Text style={styles.text}>{reservation.checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
        </View>
      </View >
    );

    return (
      <View style={styles.container}>
        <Text style={styles.containerTitle}>Yaklaşan Rezervasyonlarınız</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={reservations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: reservation }) => (
            renderReservation({ item: reservation })
          )}
        />
      </View>
    )
  }
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
              <View style={{ ...styles.mainContainer }}>
                {carouselItems && <CarouselComponent data={carouselItems} navigation={navigation} navigatePage={"HotelDetailPage"} />}
              </View>

              {reservations && authContext.isAuthenticated && <>
                {renderReservations()}
                <View style={styles.container}>
                  <View style={styles.itemContainerColumn}>
                    <View style={styles.itemContainerRow}>
                      <TouchableOpacity activeOpacity={0.8}
                        onPress={() => navigation.navigate('MyReservationsPage')}
                      >
                        <Text style={{ ...styles.titleText, color: colors.primary, }}>
                          Tüm Rezervasyonlarını Gör <MaterialCommunityIcons name="chevron-right-circle" size={18} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </>}
              {hotels &&
                <>
                  {renderHotels()}
                  <View style={styles.container}>
                    <View style={styles.itemContainerColumn}>
                      <View style={styles.itemContainerRow}>
                        <TouchableOpacity activeOpacity={0.8}
                          onPress={() => navigation.navigate('HomeHotelsPage')}
                        >
                          <Text style={{ ...styles.titleText, color: colors.primary, }}>
                            Tüm Otelleri Gör <MaterialCommunityIcons name="chevron-right-circle" size={18} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              }
              {rooms && <>
                {renderRooms()}
                <View style={styles.container}>
                  <View style={styles.itemContainerColumn}>
                    <View style={styles.itemContainerRow}>
                      <TouchableOpacity activeOpacity={0.8}
                        onPress={() => navigation.navigate('HomeRoomsPage')}
                      >
                        <Text style={{ ...styles.titleText, color: colors.primary, }}>
                          Tüm Odaları Gör <MaterialCommunityIcons name="chevron-right-circle" size={18} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </>}


            </ScrollView>
          </>
        </>
      }
    </>
  );
}

export default HomePage;
