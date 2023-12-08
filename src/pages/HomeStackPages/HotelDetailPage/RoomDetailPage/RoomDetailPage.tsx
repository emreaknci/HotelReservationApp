
import { View, Text } from "react-native";
import styles from "./RoomDetailPage.style";
import { useEffect, useState } from "react";
import RoomDetailDto from './../../../../types/rooms/roomDetailDto';
import RoomService from './../../../../services/roomService';
import CarouselComponent, { CarouselItem } from './../../../../components/CarouselComponent/CarouselComponent';
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "./../../../../../colors";
import { ScrollView } from "react-native";
const RoomDetailPage = ({ route, navigation }) => {
  const { id } = route.params;
  const [room, setRoom] = useState<RoomDetailDto>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [roomCarouselItems, setRoomCarouselItems] = useState<CarouselItem[]>(null);


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
  return (
    <>
      {room &&
        <>
          <View style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              <CarouselComponent data={roomCarouselItems} navigation={navigation} />

              <View style={styles.infoContainer}>
                <TouchableOpacity activeOpacity={1} onPress={toggleDescription}>
                  <Text style={{ ...styles.text, fontWeight: "bold" }}>Açıklama</Text>
                  <Text style={styles.text}>{getDescriptionToShow()}</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>Oda İmkanları</Text>

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
            </ScrollView>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonText}>Rezervasyon Yap</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </>

  );
}

export default RoomDetailPage;
