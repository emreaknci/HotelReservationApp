
import { View, Text } from "react-native";
import styles from "./RoomDetailPage.style";
import { useContext, useEffect, useState } from "react";
import RoomDetailDto from './../../../../types/rooms/roomDetailDto';
import RoomService from './../../../../services/roomService';
import CarouselComponent, { CarouselItem } from './../../../../components/CarouselComponent/CarouselComponent';
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "./../../../../../colors";
import { ScrollView } from "react-native";
import { AuthContext } from './../../../../context/AuthContext';
const RoomDetailPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [room, setRoom] = useState<RoomDetailDto>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [roomCarouselItems, setRoomCarouselItems] = useState<CarouselItem[]>(null);
  const authContext = useContext(AuthContext);

  const getRoom = () => {
    RoomService.getRoomByIdWithImages(id)
      .then(response => {
        setRoom(response.data.data)
        setRoomCarouselItems(response.data.data.images.map((image) => {
          return { image: image }
        }))
      })
      .catch(error => console.log(error.response));
  }

  useEffect(() => {
    getRoom()
  }, [id])
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const getDescriptionToShow = () => {
    if (showFullDescription) {
      return room?.description;
    } else {
      const description = room?.description.slice(0, 200);
      return description.length < room?.description.length
        ? `${description}... Devamını Görmek İçin Tıklayın`
        : description;
    }
  };

  const navigateToBookingPage = () => {
    navigation.navigate('ReservationStack', {
      screen: 'BookingPage',
      params: { id: room.id, title: `Rezervasyon Yap` },
    });
  }


  return (
    <>
      {room &&
        <>
          {roomCarouselItems && <CarouselComponent data={roomCarouselItems} navigation={navigation} />}
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <View style={styles.infoContainer}>
                <TouchableOpacity activeOpacity={1} onPress={toggleDescription}>
                  <Text style={styles.title}>Açıklama</Text>
                  <Text style={styles.text}>{getDescriptionToShow()}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Oda İmkanları</Text>
                <View style={styles.content}>
                  <View style={styles.contentItem}>
                    <MaterialCommunityIcons name="bed" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>{room.capacity} Kişilik</Text>

                    <MaterialCommunityIcons name="bookshelf" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>Kitaplık</Text>
                  </View>

                  <View style={styles.contentItem}>
                    <MaterialCommunityIcons name="wifi" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>Wifi</Text>

                    <MaterialCommunityIcons name="desk" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>Çalışma Masası</Text>
                  </View>

                  <View style={styles.contentItem}>
                    <MaterialCommunityIcons name="television" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>TV</Text>

                    <MaterialCommunityIcons name="fan" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={styles.contentItemText}>Klima</Text>
                  </View>
                </View>
              </View>
              {authContext.isAuthenticated
                ?
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigateToBookingPage()}>
                  <Text style={styles.buttonText}>Rezervasyon Yap</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.8} style={{...styles.button,backgroundColor:colors.secondary}} disabled>
                  <Text style={{ ...styles.buttonText, fontSize: 14 }}>Rezervasyon Yapabilmek İçin Lütfen Giriş Yapın</Text>
                </TouchableOpacity>}
            </ScrollView>

          </View>
        </>
      }
    </>

  );
}

export default RoomDetailPage;
