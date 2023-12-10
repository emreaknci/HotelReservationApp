
import { View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
import styles from "./RoomsPage.style";
import RoomDetailDto from './../../../types/rooms/roomDetailDto';
import RoomService from './../../../services/roomService';
import { useCallback, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RoomsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomDetailDto[]>(null);
  const toast = useToast();
  const [searchText, setSearchText] = useState("");

  const getRooms = () => {
    setLoading(true);
    RoomService.getRoomsWithImages()
      .then((response) => {
        setRooms(response.data.data)
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
      getRooms();
    }, [])
  );
  useEffect(() => {
    if (!rooms) return;
    if (searchText === "") {
      getRooms();
      return;
    }

    const filteredRooms = rooms.filter(room =>
      room.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setRooms(filteredRooms);
  }, [searchText]);

  const navigateToRoomDetailPage = (roomId: number, roomName: string) => {
    navigation.navigate("RoomDetailPage", { id: roomId, title: roomName });
  }

  const changeRoomStatus = (roomId: number) => {
    setLoading(true);
    RoomService.changeRoomStatus(roomId)
      .then((response) => {
        getRooms();
        toast.show(response.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleRoomStatusChange = (roomId: number) => {
    changeRoomStatus(roomId);
  }


  const renderRoomCard = (room: RoomDetailDto) => {
    return (
      <>
        <View style={styles.roomCard}>
          <View style={styles.roomInfoContainer}>
            <View style={styles.roomCardHeader}>
              <View style={styles.roomCardBody}>
                <Text style={styles.roomCardHeaderText}>Oda:</Text>
                <Text style={styles.roomCardHeaderText}>#{room.id}</Text>
              </View>
              <View style={styles.roomCardBody}>
                <Text style={styles.roomCardBodyText}>Oda Adı:</Text>
                <Text style={styles.roomCardBodyText}>{room.name}</Text>
              </View>
              <View style={styles.roomCardBody}>
                <Text style={styles.roomCardBodyText}>Günlük Fiyat:</Text>
                <Text style={styles.roomCardBodyText}>₺ {room.price}</Text>
              </View>
              <View style={styles.roomCardBody}>
                <Text style={styles.roomCardBodyText}>Durum:</Text>
                <Text style={styles.roomCardBodyText}>{room.status ? "Aktif" : "Kullanım Dışı"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.userCardBodyButtonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={{
              ...styles.userCardBodyButton, borderBottomLeftRadius: 10,
            }}
              onPress={() => navigateToRoomDetailPage(room.id, room.name)}
            >
              <Text style={styles.userCardBodyButtonText}>Detay Sayfasına Git</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{
              ...styles.userCardBodyButton, borderBottomRightRadius: 10,
            }}
              onPress={() => handleRoomStatusChange(room.id)}

            >
              <Text style={styles.userCardBodyButtonText}>{room.status ? "Kullanım Dışı Yap" : "Aktif Yap"}</Text>
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
          {rooms ?
            <View style={styles.container}>
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Müşteri Adına Göre Ara..." />
              </View>
              <FlatList
                data={rooms}
                renderItem={({ item: room }) => (renderRoomCard(room))}
                keyExtractor={(room) => room.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.roomContainer} />
            </View> :
            <>
              <View style={styles.errorContainer} >
                <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                <Text style={styles.errorContainerText}>Rezervasyon kaydı bulunamadı.</Text>
              </View>
            </>}
        </>}
    </>
  );
}

export default RoomsPage;
