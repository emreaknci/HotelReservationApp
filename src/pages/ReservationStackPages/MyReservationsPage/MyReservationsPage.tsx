
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from "react-native";
import styles from "./MyReservationsPage.style";
import { useCallback, useEffect, useState } from "react";
import ReservationService from './../../../services/reservationService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReservationListDto from './../../../types/reservations/reservationListDto';
import { useFocusEffect } from "@react-navigation/native";
import HeaderComponent from './../../../components/HeaderComponent/HeaderComponent';
import { useToast } from "react-native-toast-notifications";

const MyReservationsPage = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [myReservations, setMyReservations] = useState<ReservationListDto[]>(null);
  const [pastReservationBtnActive, setPastReservationBtnActive] = useState(false);
  const [activeReservationBtnActive, setActiveReservationBtnActive] = useState(false);
  const [canceledReservationBtnActive, setCanceledReservationBtnActive] = useState(false);

  const toast = useToast();

  const getMyAllReservations = async () => {
    setLoading(true);
    await ReservationService.getMyAllReservations()
      .then((response) => {
        setMyReservations(response.data.data);
      })
      .catch((err) => {
        setMyReservations(null);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMyActiveReservations = async () => {
    setLoading(true);
    await ReservationService.getMyActiveReservations()
      .then((response) => {
        setMyReservations(response.data.data);
      })
      .catch((err) => {
        setMyReservations(null);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMyPastReservations = async () => {
    setLoading(true);
    await ReservationService.getMyPastReservations()
      .then((response) => {
        setMyReservations(response.data.data);
      })
      .catch((err) => {
        setMyReservations(null);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getMyCanceledReservations = async () => {
    setLoading(true);
    await ReservationService.getMyCanceledReservations()
      .then((response) => {
        setMyReservations(response.data.data);
      })
      .catch((err) => {
        setMyReservations(null);
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (activeReservationBtnActive) {
        getMyActiveReservations();
      }
      else if (pastReservationBtnActive) {
        getMyPastReservations();
      }
      else {
        getMyAllReservations();
      }
    }, [])
  )

  const handlePastReservationBtn = () => {
    setPastReservationBtnActive(true);
    setActiveReservationBtnActive(false);
    setCanceledReservationBtnActive(false);
    getMyPastReservations();
  }

  const handleActiveReservationBtn = () => {
    setPastReservationBtnActive(false);
    setActiveReservationBtnActive(true);
    setCanceledReservationBtnActive(false);
    getMyActiveReservations();
  }
  const handleCanceledReservationBtn = () => {
    setPastReservationBtnActive(false);
    setActiveReservationBtnActive(false);
    setCanceledReservationBtnActive(true);
    getMyCanceledReservations();
  }
  const handleReservationBtn = () => {
    setPastReservationBtnActive(false);
    setActiveReservationBtnActive(false);
    setCanceledReservationBtnActive(false);
    getMyAllReservations();
  }

  const renderReservationButtons = () => {

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

        <TouchableOpacity onPress={handleReservationBtn} activeOpacity={0.9}
          style={(pastReservationBtnActive || activeReservationBtnActive || canceledReservationBtnActive) == false ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={(pastReservationBtnActive || activeReservationBtnActive || canceledReservationBtnActive) == false ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Rezervasyonlarım
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleActiveReservationBtn} activeOpacity={0.9}
          style={activeReservationBtnActive ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={activeReservationBtnActive ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Aktif
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePastReservationBtn} activeOpacity={0.9}
          style={pastReservationBtnActive ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={pastReservationBtnActive ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Geçmiş
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCanceledReservationBtn} activeOpacity={0.9}
          style={canceledReservationBtnActive ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={canceledReservationBtnActive ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            İptal Edilenler
          </Text>
        </TouchableOpacity>

      </ScrollView>
    )
  }
  const handleCancel = async (reservationId: number) => {
    console.log("cancel tocuhed", reservationId)
    await ReservationService.cancelReservation(reservationId)
      .then((response) => {
        if (response.data.success) {
          toast.show(response.data.message, {
            type: "custom_type",
            placement: "center",
            animationType: "zoom-in",
            swipeEnabled: true,
          });
          handleReservationBtn();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  const handleEdit = async (reservationId: number) => {

  }
  const navigateToHotelDetailPage = (hotelId: number, hotelName: string) => {
    navigation.navigate("HotelDetailPage", { id: hotelId, title: hotelName })
  }
  const navigateToRoomDetailPage = (roomId: number, roomName: string) => {
    navigation.navigate("RoomDetailPage", { id: roomId, title: roomName })
  }
  const renderReservation = (reservation: ReservationListDto) => {
    return (
      <View key={reservation.id} style={styles.reservationCard} >
        <View style={styles.reservationCardHeader}>
          <Text style={styles.reservationCardHeaderText} onPress={() => navigateToHotelDetailPage(reservation.hotelId, reservation.hotelName)}>{reservation.hotelName}</Text>
          <Text style={styles.reservationCardHeaderSubText} onPress={() => navigateToRoomDetailPage(reservation.roomId, reservation.roomName)} >{reservation.roomName}</Text>
          <Text style={styles.reservationCardHeaderSubText}>{reservation.roomType}</Text>
        </View>
        <View style={styles.reservationCardBody}>
          <View style={styles.reservationCardBodyRow}>
            <Text style={styles.reservationCardBodyRowText}>Giriş Tarihi</Text>
            <Text style={styles.reservationCardBodyRowText}>{reservation.checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View style={styles.reservationCardBodyRow}>
            <Text style={styles.reservationCardBodyRowText}>Çıkış Tarihi</Text>
            <Text style={styles.reservationCardBodyRowText}>{reservation.checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View style={styles.reservationCardBodyRow}>
            <Text style={styles.reservationCardBodyRowText}>Durum</Text>
            <Text style={styles.reservationCardBodyRowText}>{reservation.paymentStatus == "Paid" ? "Ödendi" : "İptal Edildi"}</Text>
          </View>
          <View style={styles.reservationCardBodyRow}>
            <Text style={styles.reservationCardBodyRowText}>Toplam Fiyat</Text>
            <Text style={styles.reservationCardBodyRowText}>₺ {reservation.amount}</Text>
          </View>
        </View>
        {(new Date(reservation.checkInDate) > new Date() && reservation.paymentStatus == "Paid") && (
          <View style={styles.reservationCardBodyRow}>
            <TouchableOpacity activeOpacity={0.8} style={styles.reservationCardBodyRowButton} onPress={() => handleCancel(reservation.id)}>
              <Text style={styles.reservationCardBodyRowButtonText}>İptal Et</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.reservationCardBodyRowButton} onPress={() => handleEdit(reservation.id)}>
              <Text style={styles.reservationCardBodyRowButtonText}>Düzenle</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )

  }
  const renderMyReservations = () => {
    return (
      <FlatList
        data={myReservations}
        keyExtractor={(reservation) => reservation.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 50 }}
        renderItem={({ item: reservation }) => (renderReservation(reservation))}
      />
    )
  }
  return (
    <>
      <HeaderComponent />
      <View style={styles.container} >
        {loading ?
          <>
            <View style={styles.errorContainer} >
              <ActivityIndicator size="large" color="#de2d5f" />
              <Text style={styles.errorContainerText}>Yükleniyor...</Text>
            </View>
          </>
          :
          <>
            {myReservations
              ?
              <>
                <View style={styles.reservationContainer} >
                  {renderReservationButtons()}
                  {renderMyReservations()}
                </View>
              </>
              :
              <>
                <View style={styles.reservationContainer} >
                  {renderReservationButtons()}
                </View>
                <View style={styles.errorContainer} >
                  <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                  <Text style={styles.errorContainerText}>Rezervasyon kaydı bulunamadı.</Text>
                </View>
              </>
            }</>}
      </View>
    </>
  );
}

export default MyReservationsPage;
