
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import styles from "./ReservationsPage.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReservationService from './../../../services/reservationService';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import ReservationListDto from './../../../types/reservations/reservationListDto';
import colors from "../../../../colors"
import { useToast } from "react-native-toast-notifications";
const ReservationsPage = () => {

  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationListDto[]>(null);
  const toast = useToast();
  const [searchText, setSearchText] = useState("");

  const getReservations = () => {
    setLoading(true);
    ReservationService.getAllWithDetails()
      .then((response) => {
        setReservations(response.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const cancelReservation = (reservationId: number) => {
    ReservationService.cancelReservation(reservationId)
      .then((response) => {
        getReservations();
        console.log(response.data)
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
  const handleCancelReservation = (reservationId: number) => {
    cancelReservation(reservationId);
  }
  useFocusEffect(
    useCallback(() => {
      getReservations();
    }, [])
  );
  useEffect(() => {
    if (!reservations) return;
    if (searchText === "") {
      getReservations();
      return;
    }

    const filteredReservations = reservations.filter(reservation =>
      reservation.customerFullName.toLowerCase().includes(searchText.toLowerCase())
    );

    setReservations(filteredReservations);
    console.log(searchText)
    console.log(filteredReservations)
  }, [searchText]);


  const renderReservationCard = (reservation: ReservationListDto) => {
    return (
      <>
        <View style={styles.reservationCard}>
          <View style={styles.reservationInfoContainer}>
            <View style={styles.reservationCardHeader}>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardHeaderText}>Rezervasyon:</Text>
                <Text style={styles.reservationCardHeaderText}>#{reservation.id}</Text>
              </View>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Giriş Tarihi:</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              </View>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Çıkış Tarihi:</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              </View>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Toplam Fiyat:</Text>
                <Text style={styles.reservationCardBodyText}>₺ {reservation.amount}</Text>
              </View>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Durum:</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.paymentStatus == "Paid" ? "Ödendi" : "İptal Edildi"}</Text>
              </View>
            </View>
            <View style={styles.reservationCardLine} />
            <View style={styles.reservationCardHeader}>
              <Text style={styles.reservationCardHeaderText}>Otel - Oda Bilgileri</Text>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Otel:</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.hotelName}</Text>
              </View>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Oda:</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.roomName}</Text>
              </View>
            </View>
            <View style={styles.reservationCardLine} />
            <View style={styles.reservationCardHeader}>
              <Text style={styles.reservationCardHeaderText}>Müşteri Bilgileri</Text>
              <View style={styles.reservationCardBody}>
                <Text style={styles.reservationCardBodyText}>Müşteri</Text>
                <Text style={styles.reservationCardBodyText}>{reservation.customerFullName}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8}
            disabled={!(new Date(reservation.checkInDate) > new Date() && reservation.paymentStatus === "Paid")}
            style={{
              ...styles.reservationCardBodyButton,
              backgroundColor: new Date(reservation.checkInDate) > new Date() && reservation.paymentStatus === "Paid"
                ? colors.primary
                : colors.secondary
            }}
            onPress={() => handleCancelReservation(reservation.id)}
          >
            <Text style={styles.reservationCardBodyButtonText}>
              {new Date(reservation.checkInDate) > new Date() && reservation.paymentStatus === "Paid" ? "İptal Et" : "İptal Edilemez"}
            </Text>
          </TouchableOpacity>
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
          {reservations ?
            <View style={styles.container}>
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Müşteri Adına Göre Ara..." />
              </View>
              <FlatList
                data={reservations}
                renderItem={({ item: reservation }) => (renderReservationCard(reservation))}
                keyExtractor={(reservation) => reservation.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.reservationContainer} />
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

export default ReservationsPage;