
import { View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
import styles from "./RoomsPage.style";
import RoomDetailDto from './../../../types/rooms/roomDetailDto';
import RoomService from './../../../services/roomService';
import { useCallback, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalComponent from './../../../components/ModalComponent/ModalComponent';
import SelectDropdown from "react-native-select-dropdown";
import HotelDto from './../../../types/hotels/hotelDto';
import HotelService from './../../../services/hotelService';

const RoomsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomDetailDto[]>(null);
  const [filteredRooms, setFilteredRooms] = useState<RoomDetailDto[]>(null);
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [hotelList, setHotelList] = useState<HotelDto[]>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(0);
  const getHotels = () => {
    setLoading(true);
    HotelService.getAllForDropdown()
      .then((response) => {
        setHotelList(response.data.data)
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
        setRooms(response.data.data)
        setFilteredRooms(response.data.data)
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
  const navigateToEditRoomPage = (roomId: number) => {
    navigation.navigate("EditRoomPage", { id: roomId });
  }
  const changeRoomStatus = (roomId: number) => {
    setLoading(true);
    RoomService.changeRoomStatus(roomId)
      .then((response) => {
        getRoomsByHotelId(selectedHotelId);
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

  const deleteRoom = (roomId: number) => {
    setLoading(true);
    RoomService.removeById(roomId)
      .then((response) => {
        getRoomsByHotelId(selectedHotelId);
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

  const handleDeletePress = (roomId) => {
    setRoomId(roomId);
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setConfirmationModalVisible(false);
    deleteRoom(roomId);
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
  };
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
              <View style={styles.roomCardBody}>
                <Text style={styles.roomCardBodyText}>Durum:</Text>
                <Text style={styles.roomCardBodyText} onPress={() => handleRoomStatusChange(room.id)}>
                  {room.status ? "Aktif (Kullanım Dışı Yap)" : "Kullanım Dışı (Aktif Yap)"}
                </Text>
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
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.roomCardBodyButton, }}
              onPress={() => navigateToEditRoomPage(room.id)}
            >
              <Text style={styles.roomCardBodyButtonText}>Bilgileri Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.roomCardBodyButton, borderBottomRightRadius: 10, }}
              onPress={() => handleDeletePress(room.id)}
            >
              <Text style={styles.roomCardBodyButtonText}>Oda Bilgilerini Sil</Text>
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
                <ModalComponent isVisible={isConfirmationModalVisible}
                  onCancel={handleCancelDelete} onConfirm={handleConfirmDelete}
                  modalText="Odayı silmek istediğiniziden emin misiniz? Değişikler geri alınamaz."
                  onConfirmText="Sil"
                  onCancelText="İptal" />
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
