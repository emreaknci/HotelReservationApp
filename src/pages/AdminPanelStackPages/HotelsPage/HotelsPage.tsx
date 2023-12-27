
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, FlatList, Modal } from "react-native";
import styles from "./HotelsPage.style";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import HotelService from './../../../services/hotelService';
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HotelDetailDto from './../../../types/hotels/hotelDetailDto';
import ModalComponent from './../../../components/ModalComponent/ModalComponent';
import colors from "../../../../colors";

const HotelsPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<HotelDetailDto[]>(null);
  const [filteredHotels, setFilteredHotels] = useState<HotelDetailDto[]>(null);
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [hotelId, setHotelId] = useState(0);
  const getHotels = () => {
    setLoading(true);
    HotelService.getAllWithImages()
      .then((response) => {
        setHotels(response.data.data)
        setFilteredHotels(response.data.data)
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
      hotel.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredHotels(filteredHotels);
  }, [searchText]);

  const navigateToHotelDetailPage = (hotelId: number, hotelName: string) => {
    navigation.navigate("HotelDetailPage", { id: hotelId, title: hotelName });
  }
  const navigateToEditHotelPage = (hotelId: number) => {
    navigation.navigate("EditHotelPage", { id: hotelId });
  }

  const changeHotelStatus = (hotelId: number) => {
    setLoading(true);
    HotelService.changeHotelStatus(hotelId)
      .then((response) => {
        getHotels();
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

  const deleteHotel = (hotelId: number) => {
    setLoading(true);
    HotelService.removeById(hotelId)
      .then((response) => {
        getHotels();
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

  const handleHotelStatusChange = (hotelId: number) => {
    changeHotelStatus(hotelId);
  }

  const handleDeletePress = (hotelId) => {
    setHotelId(hotelId);
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setConfirmationModalVisible(false);
    deleteHotel(hotelId);
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
  };
  const renderHotelCard = (hotel: HotelDetailDto) => {
    return (
      <>
        <View style={styles.hotelCard}>
          <View style={styles.hotelInfoContainer}>
            <View style={styles.hotelCardHeader}>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardHeaderText}>#{hotel.id}</Text>
                <Text style={styles.hotelCardHeaderText}></Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Otel Adı:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.name}</Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Mail:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.email}</Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Telefon:</Text>
                <Text style={styles.hotelCardBodyText}>{hotel.phone}</Text>
              </View>
              <View style={styles.hotelCardBody}>
                <Text style={styles.hotelCardBodyText}>Durum:</Text>
                <Text
                  style={[
                    styles.hotelCardBodyText,
                    { color: hotel.status ? 'green' : colors.primary },
                  ]}
                  onPress={() => handleHotelStatusChange(hotel.id)}
                >
                  {hotel.status ? 'Aktif (Kullanım Dışı Yap)' : 'Kullanım Dışı (Aktif Yap)'}
                </Text>

              </View>
            </View>
          </View>

          <View style={styles.userCardBodyButtonContainer}>
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.userCardBodyButton, borderBottomLeftRadius: 10, }}
              onPress={() => navigateToHotelDetailPage(hotel.id, hotel.name)}
            >
              <Text style={styles.userCardBodyButtonText}>Detay Sayfasına Git</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.userCardBodyButton, }}
              onPress={() => navigateToEditHotelPage(hotel.id)}
            >
              <Text style={styles.userCardBodyButtonText}>Bilgileri Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}
              style={{ ...styles.userCardBodyButton, borderBottomRightRadius: 10, }}
              onPress={() => handleDeletePress(hotel.id)}
            >
              <Text style={styles.userCardBodyButtonText}>Otel Bilgilerini Sil</Text>
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
                <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Otel Adına Göre Ara..." />
              </View>
              <FlatList
                data={filteredHotels}
                renderItem={({ item: hotel }) => (renderHotelCard(hotel))}
                keyExtractor={(hotel) => hotel.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.hotelContainer} />
              <ModalComponent isVisible={isConfirmationModalVisible}
                onCancel={handleCancelDelete} onConfirm={handleConfirmDelete}
                modalText="Oteli silmek istediğiniziden emin misiniz? Değişikler geri alınamaz."
                onConfirmText="Sil"
                onCancelText="İptal" />
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
