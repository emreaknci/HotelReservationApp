
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import styles from "./MyReservationsPage.style";
import { useEffect, useState } from "react";
import ReservationService from './../../../services/reservationService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReservationListDto from './../../../types/reservations/reservationListDto';

const MyReservationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [myReservations, setMyReservations] = useState<ReservationListDto[]>(null);
  const [pastReservationBtnActive, setPastReservationBtnActive] = useState(false);
  const [activeReservationBtnActive, setActiveReservationBtnActive] = useState(false);

  const getMyAllReservations = async () => {
    setLoading(true);
    const response = await ReservationService.getMyAllReservations();
    if (response.data.success) {
      setMyReservations(response.data.data);
    }
    setLoading(false);
  };

  const getMyActiveReservations = async () => {
    setLoading(true);
    const response = await ReservationService.getMyActiveReservations();
    if (response.data.success) {
      setMyReservations(response.data.data);
    }
    setLoading(false);
  };

  const getMyPastReservations = async () => {
    setLoading(true);
    await ReservationService.getMyPastReservations()
      .then((response) => {
        if (response.data.success) {
          setMyReservations(response.data.data);
        }
        setLoading(false);
      }
      )
      .catch((err) => {
        setMyReservations(null);
        console.log(err.response.data);
        setLoading(false);
      });

  };

  useEffect(() => {
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

  const handlePastReservationBtn = () => {
    setPastReservationBtnActive(true);
    setActiveReservationBtnActive(false);
    getMyPastReservations();
  }

  const handleActiveReservationBtn = () => {
    setPastReservationBtnActive(false);
    setActiveReservationBtnActive(true);
    getMyActiveReservations();
  }
  const handleReservationBtn = () => {
    setPastReservationBtnActive(false);
    setActiveReservationBtnActive(false);
    getMyAllReservations();
  }

  const renderReservationButtons = () => {

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={handleReservationBtn} activeOpacity={0.9}
          style={(pastReservationBtnActive || activeReservationBtnActive) == false ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={(pastReservationBtnActive || activeReservationBtnActive) == false ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Rezervasyonlarım
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePastReservationBtn} activeOpacity={0.9}
          style={pastReservationBtnActive ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={pastReservationBtnActive ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Geçmiş Rezervasyonlarım
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleActiveReservationBtn} activeOpacity={0.9}
          style={activeReservationBtnActive ? styles.reservationContainerActiveButton : styles.reservationContainerButton}
        >
          <Text style={activeReservationBtnActive ? styles.reservationContainerActiveButtonText : styles.reservationContainerButtonText}>
            Aktif Rezervasyonlarım
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
  const renderMyReservations = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{marginVertical:50}}>
        {myReservations.map((reservation) => (
          <View key={reservation.id} style={styles.reservationCard} >
            <View style={styles.reservationCardHeader} >
              <Text style={styles.reservationCardHeaderText} >{reservation.hotelName}</Text>
              <Text style={styles.reservationCardHeaderSubText} >{reservation.roomName}</Text>
              <Text style={styles.reservationCardHeaderSubText} >{reservation.roomType}</Text>
            </View>
            <View style={styles.reservationCardBody} >
              <View style={styles.reservationCardBodyRow} >
                <Text style={styles.reservationCardBodyRowText} >Giriş Tarihi</Text>
                <Text style={styles.reservationCardBodyRowText} >{reservation.checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              </View>
              <View style={styles.reservationCardBodyRow} >
                <Text style={styles.reservationCardBodyRowText} >Çıkış Tarihi</Text>
                <Text style={styles.reservationCardBodyRowText} >{reservation.checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
              </View>
              <View style={styles.reservationCardBodyRow} >
                <Text style={styles.reservationCardBodyRowText} >Durum</Text>
                <Text style={styles.reservationCardBodyRowText} >{reservation.paymentStatus=="Paid" ?"Ödendi":"İptal Edildi"}</Text>
              </View>
              <View style={styles.reservationCardBodyRow} >
                <Text style={styles.reservationCardBodyRowText} >Toplam Fiyat</Text>
                <Text style={styles.reservationCardBodyRowText} >₺ {reservation.amount}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    )
  }
  return (
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
  );
}

export default MyReservationsPage;
