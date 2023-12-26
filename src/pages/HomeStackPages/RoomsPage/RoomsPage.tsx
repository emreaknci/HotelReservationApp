
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./RoomsPage.style";
import HotelService from './../../../services/hotelService';
import RoomService from './../../../services/roomService';
import { TouchableOpacity } from "react-native";
import RoomDetailDto from './../../../types/rooms/roomDetailDto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import HotelDto from "src/types/hotels/hotelDto";
import { useFocusEffect } from "@react-navigation/native";

const RoomsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomDetailDto[]>(null);
  const [filteredRooms, setFilteredRooms] = useState<RoomDetailDto[]>(null);
  const [searchText, setSearchText] = useState("");
  const [hotelList, setHotelList] = useState<HotelDto[]>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(0);

  const getHotels = () => {
    setLoading(true);
    HotelService.getAllForDropdown()
      .then((response) => {
        const activeHotels = response.data.data.filter((hotel) => hotel.status);
        setHotelList(activeHotels)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getRoomsByHotelId = (hotelId) => {
    setLoading(true);
    HotelService.getByIdWithImagesAndRooms(hotelId)
      .then((response) => {
        setRooms(response.data.data.rooms)
        setFilteredRooms(response.data.data.rooms)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const getAllRooms = () => {
    setLoading(true);
    RoomService.getRoomsWithImages()
      .then((response) => {
        const activeRooms = response.data.data.filter((room) => room.status);
        setRooms(activeRooms)
        setFilteredRooms(activeRooms)
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
    if (!rooms) return;
    if (searchText === "") {
      setFilteredRooms(rooms);
      return;
    }

    const filteredRooms = rooms.filter((room) => {
      const roomName = room.name.toLowerCase();
      const searchTextLower = searchText.toLowerCase();
      return roomName.includes(searchTextLower);
    });

    setFilteredRooms(filteredRooms);

  }, [searchText]);

  const navigateToRoomDetailPage = (roomId: number, roomName: string) => {
    navigation.navigate("RoomDetailPage", { id: roomId, title: roomName });
  }
  const handleSelectedHotel = (selectedItem, index) => {
    if (index === 0)
      setSelectedHotelId(0);
    else
      setSelectedHotelId(hotelList.find((hotel) => hotel.name === selectedItem).id);
  }
  const renderInput = () => {
    return (
      <>
        {hotelList &&
          <View style={styles.buttonContainer}>
            <SelectDropdown
              data={['Tümünü Getir', ...hotelList.map((hotel) => hotel.name)]}
              defaultButtonText={selectedHotelId === 0 ? "Tümünü Getir" : hotelList.find((hotel) => hotel.id === selectedHotelId).name}
              onSelect={(selectedItem, index) => {
                handleSelectedHotel(selectedItem, index)
              }}
              dropdownIconPosition='right'
              renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
              buttonStyle={{ ...styles.input }}
            />
            <TouchableOpacity style={{ ...styles.searchButton }} onPress={() => {
              if (selectedHotelId === 0)
                getAllRooms();
              else
                getRoomsByHotelId(selectedHotelId);
            }}>
              <Text style={styles.buttonText}>Ara</Text>
            </TouchableOpacity>
          </View>}
      </>
    )
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
            </View>
          </View>

          <View style={styles.roomCardBodyButtonContainer}>
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.roomCardBodyButton, borderBottomLeftRadius: 10, }}
              onPress={() => navigateToRoomDetailPage(room.id, room.name)}
            >
              <Text style={styles.roomCardBodyButtonText}>Detay Sayfasına Git</Text>
            </TouchableOpacity>
          </View>
        </View >
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
          <View style={styles.container}>
            {renderInput()}
            {rooms ?
              <>
                <View style={styles.searchContainer}>
                  <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
                  <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Oda Adına Göre Ara..." />
                </View>
                <FlatList
                  data={filteredRooms}
                  renderItem={({ item: room }) => (renderRoomCard(room))}
                  keyExtractor={(room) => room.id.toString()}
                  showsVerticalScrollIndicator={false}
                  style={styles.roomContainer} />
              </>
              :
              <>
                {selectedHotelId && !rooms ?
                  <View style={styles.errorContainer} >
                    <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                    <Text style={styles.errorContainerText}>Otel kaydı bulunamadı.</Text>
                  </View> :
                  <>

                  </>}
              </>}
          </View>
        </>}
    </>
  );
}

export default RoomsPage;
  