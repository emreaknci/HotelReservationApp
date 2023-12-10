import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import RoomDetailDto from './../../../types/rooms/roomDetailDto';
import RoomService from './../../../services/roomService';
import CreateReservationDto from './../../../types/reservations/createReservationDto';
import styles from './BookingPage.style';
import colors from '../../../../colors';
import ReservationService from './../../../services/reservationService';
import { AuthContext } from './../../../context/AuthContext';
import ReservationCheckDto from './../../../types/reservations/reservationCheckDto';
import { useToast } from 'react-native-toast-notifications';
import CreatePaymentDto from './../../../types/payments/createPaymentDto';

const BookingPage = ({ route, navigation }) => {
  const { id } = route.params;
  const authContext = useContext(AuthContext);

  const toast = useToast();

  const [roomDetail, setRoomDetail] = useState<RoomDetailDto>();
  const [totalDay, setTotalDay] = useState(0);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [showCheckInDate, setCheckInDateShow] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckOutDate, setCheckOutDateShow] = useState(false);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const years = Array.from({ length: 20 }, (_, index) => new Date().getFullYear() + index);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [paymentDto, setPaymentDto] = useState<CreatePaymentDto>({
    cardHolderName: '',
    cardNumber: '',
    cvv: '',
    expirationDate: null,
  })
  const [reservationData, setReservationData] = useState<CreateReservationDto>({
    roomId: id,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    customerId: authContext.user.id,
    hotelId: roomDetail ? roomDetail.id : 0,
    paymentDto: {
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expirationDate: null,
    },
  });
  const [errorMessages, setErrorMessages] = useState({
    cardHolderName: '',
    cardNumber: '',
    cvv: '',
    expirationDate: '',
  });

  const [step, setStep] = useState(1);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const initStateVals = () => {
    setStep(1);
    setRoomDetail(null);
    setCheckInDate(new Date());
    setCheckInDateShow(false);
    setCheckOutDate(new Date());
    setCheckOutDateShow(false);
    calculateDayDifference();
    setPaymentDto({
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expirationDate: null,
    });
    setReservationConfirmed(false);
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
    setReservationData({
      roomId: id,
      checkInDate: new Date(),
      checkOutDate: new Date(),
      customerId: authContext.user.id,
      hotelId: roomDetail ? roomDetail.id : 0,
      paymentDto: {
        cardHolderName: '',
        cardNumber: '',
        cvv: '',
        expirationDate: null,
      },
    });
    setErrorMessages({
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expirationDate: '',
    });

  };
  useEffect(() => {
    const year = selectedYear
    const month = selectedMonth
    const day = new Date(year, month, 0).getDate();
    const date = new Date(year, month - 1, day);
    date.setHours(23, 59, 59, 999);
    setPaymentDto({ ...paymentDto, expirationDate: date })
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (reservationConfirmed) {
      setTimeout(() => {
        initStateVals();
        navigation.navigate('HomeStack', {
          screen: 'HomeStackPages',
        });
      }, 2500);
    }
  }, [reservationConfirmed]);

  const getRoomDetail = () => {
    RoomService.getRoomByIdWithImages(id)
      .then((response) => {
        setRoomDetail(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRoomDetail();
    setCheckInDateShow(false);
    setCheckOutDateShow(false);
  }, [route]);
  useEffect(() => {
    calculateDayDifference();
    setReservationData(prevData => ({ ...prevData, checkInDate: checkInDate, checkOutDate: checkOutDate }))
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (step === 3) setStep(4);
  }, [step]);


  useEffect(() => {
    validatePaymentData();
    setPaymentDto(paymentDto);
    setReservationData(prevData => ({ ...prevData, hotelId: roomDetail?.hotelId, paymentDto: paymentDto }))
  }, [paymentDto]);


  const createReservation = () => {

    ReservationService.createReservation(reservationData)
      .then((response) => {
        setStep(3)
        setReservationConfirmed(true);
      })
      .catch((err) => {
        console.log(err.response.data)
        setStep(2)
        toast.show(err.response.data, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          data: {
            title: "Hata!",
          },
          swipeEnabled: true,
        });
      })
  }

  const handlePayment = () => {
    if (!validatePaymentData()) return;
    createReservation();
  }
  const calculateDayDifference = () => {
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1;
    setTotalDay(dayDifference);
  };

  const onCheckInDateChange = (selectedDate) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp) || checkInDate;
    setCheckInDateShow(false);
    setCheckInDate(currentDate);
    setCheckOutDate(currentDate);
  };
  const onCheckOutDateChange = (selectedDate) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp) || checkOutDate;
    setCheckOutDateShow(false);
    setCheckOutDate(currentDate);
  };
  const checkCustomerBookingAndRoomOccupancy = () => {
    const dto: ReservationCheckDto = {
      customerId: authContext.user.id,
      roomId: id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate
    }
    ReservationService.checkCustomerBookingAndRoomOccupancy(dto)
      .then((response) => {
        setStep(2)
      }
      ).catch((err) => {
        console.log(err.response.data)
        toast.show(err.response.data, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          data: {
            title: "Hata!",
          },
          swipeEnabled: true,
        });
      })
  }
  const handleInputChange = (key, value) => {
    setPaymentDto({ ...paymentDto, [key]: value });
  };

  const validatePaymentData = () => {
    const errors = {
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expirationDate: '',
    };

    if (!paymentDto.cvv || paymentDto.cvv.length !== 3 || !paymentDto.cvv.split('').every(char => char >= '0' && char <= '9')) {
      errors.cvv = 'CVV alanı 3 haneli olmalıdır';
    }

    if (!paymentDto.cardNumber || paymentDto.cardNumber.length !== 16 || !paymentDto.cardNumber.split('').every(char => char >= '0' && char <= '9')) {
      errors.cardNumber = 'Kart numarası alanı 16 haneli olmalıdır';
    }

    if (!paymentDto.cardHolderName || /\d/.test(paymentDto.cardHolderName)) {
      errors.cardHolderName = 'Kart sahibi alanı boş bırakılamaz';
    }

    if (paymentDto.expirationDate == null || new Date(paymentDto.expirationDate) <= new Date()) {
      errors.expirationDate = 'Geçerli bir son kullanma tarihi seçiniz';
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const renderStep1 = () => (
    <>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonContainerText}>
          Giriş Tarihi {checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setCheckInDateShow(true)}>
          <Text style={styles.buttonText}>Giriş Tarihi Seç</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonContainerText}>
          Çıkış Tarihi {checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setCheckOutDateShow(true)}>
          <Text style={styles.buttonText}>Çıkış Tarihi Seç</Text>
        </TouchableOpacity>
      </View>

      {showCheckInDate && (
        <DateTimePicker
          locale="tr-TR"
          value={checkInDate}
          onChange={onCheckInDateChange}
          minimumDate={new Date()}
          display="spinner"
          positiveButton={{ label: 'Seç', textColor: colors.primary }}
          negativeButton={{ label: 'İptal', textColor: colors.primary }}
        />
      )}
      {showCheckOutDate && (
        <DateTimePicker
          locale="tr-TR"
          value={checkOutDate}
          onChange={onCheckOutDateChange}
          minimumDate={checkInDate}
          display="spinner"
          positiveButton={{ label: 'Seç', textColor: colors.primary }}
          negativeButton={{ label: 'İptal', textColor: colors.primary }}
        />
      )}

      {step === 1 && <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity style={{ ...styles.button, width: '100%', margin: 0, marginTop: 10 }} onPress={() => {
          checkCustomerBookingAndRoomOccupancy()
        }}>
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>}
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="account" style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder={'Kart Sahibi'} value={paymentDto.cardHolderName}
          onChangeText={(value) => handleInputChange('cardHolderName', value)}
        />
        {errorMessages.cardHolderName && <Text style={styles.errorText}>
          {errorMessages.cardHolderName} <MaterialCommunityIcons
            name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="credit-card" style={styles.inputIcon} />
        <TextInput keyboardType='numeric' maxLength={16} style={styles.input} placeholder={'Kart Numarası'} value={paymentDto.cardNumber}
          onChangeText={(value) => handleInputChange('cardNumber', value)}
        />
        {errorMessages.cardNumber && <Text style={styles.errorText}>
          {errorMessages.cardNumber} <MaterialCommunityIcons
            name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="credit-card-lock" style={styles.inputIcon} />
        <TextInput keyboardType='numeric' maxLength={3} style={styles.input} placeholder={'CVV'} value={paymentDto.cvv}
          onChangeText={(value) => handleInputChange('cvv', value)}
        />
        {errorMessages.cvv && <Text style={styles.errorText}>
          {errorMessages.cvv} <MaterialCommunityIcons
            name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>}
      </View>
      <View style={{
        ...styles.inputContainer, paddingBottom: 1, borderBottomWidth: 0, paddingVertical: 0,
        marginBottom: 0,
      }}>
        <MaterialCommunityIcons name="calendar" style={{ ...styles.inputIcon }} />
        <SelectDropdown data={months} defaultButtonText={"Ay"}
          dropdownIconPosition='right'
          renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
          buttonStyle={{ width: "45%", backgroundColor: colors.background }}
          buttonTextStyle={{ color: colors.primary }}
          onSelect={(selectedItem, index) => {
            setSelectedMonth(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <SelectDropdown data={years} defaultButtonText={'Yıl'}
          dropdownIconPosition='right'
          renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
          buttonStyle={{ width: "45%", backgroundColor: colors.background }}
          buttonTextStyle={{ color: colors.primary }}
          onSelect={(selectedItem, index) => {
            setSelectedYear(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
      <View style={{
        ...styles.inputContainer,
        paddingBottom: 1,
        paddingVertical: 0,
        marginBottom: 0,
        justifyContent: "center"
      }}>
        {errorMessages.expirationDate && <Text style={styles.errorText}>
          <MaterialCommunityIcons
            name='alert-circle-outline' style={[styles.errorIcon]} /> {errorMessages.expirationDate} </Text>}
      </View>
      <View style={{ ...styles.infoContainer, justifyContent: "center", marginVertical: 10 }}>
        <Text>
          <Text style={{ ...styles.infoText, fontWeight: "bold" }}>Toplam tutar: ₺ {roomDetail.price * totalDay} {`(${totalDay} gün ${totalDay} gece)`}</Text>
        </Text>
      </View>
      {step == 2 &&
        <>
          <View style={{ ...styles.buttonContainer, marginTop: 10 }}>
            <TouchableOpacity style={{ ...styles.button, width: "45%", margin: 0, marginRight: 10, backgroundColor: colors.background, borderColor: colors.primary, borderWidth: 1 }} onPress={() => setStep(1)} >
              <Text style={{ ...styles.buttonText, color: colors.primary }}>
                Tarihleri Düzenle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, width: "45%", margin: 0, marginLeft: 10 }} onPress={handlePayment} >
              <Text style={styles.buttonText}>
                Ödeme Yap
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }

    </>
  );

  const renderStep3 = () => (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <MaterialCommunityIcons name={"check-decagram"} size={64} color={colors.primary} />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10, marginBottom: 10, color: colors.primary }}>
            Rezervasyon Oluşturuldu!
          </Text>
        </View>

        <View style={{ ...styles.reservationInfoContainer }}>
          <View style={{ ...styles.infoContainer, justifyContent: "center", borderBottomWidth: 3, borderBottomColor: colors.primary }}>
            <Text style={{ ...styles.reservationInfoText, fontWeight: "bold", fontSize: 24 }}>Rezervasyon Bilgileri</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Otel:</Text> {roomDetail.hotelName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Oda:</Text> {roomDetail.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Gün:</Text> {`${totalDay} gün ${totalDay} gece`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Toplam Tutar:</Text> ₺ {roomDetail.price * totalDay}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Giriş Tarihi:</Text> {checkInDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.reservationInfoText }}><Text style={{ fontWeight: "bold" }}>Toplam Tutar:</Text> {checkOutDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 18 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10, marginBottom: 10, color: colors.primary }}>
            Ana Sayfaya Yönlendiriliyorsunuz...
          </Text>
        </View>

      </View>
    </>
  );



  return (
    <>
      {roomDetail && roomDetail.id == id && (
        <View style={styles.container}>
          {(step == 1 || step == 2) && <>
            <View style={{ ...styles.infoContainer, justifyContent: "center" }}>
              <Text style={{ ...styles.infoText, fontWeight: "bold", fontSize: 20 }}>Otel - Oda Bilgileri</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}><Text style={{ fontWeight: "bold" }}>Otel:</Text> {roomDetail.hotelName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}><Text style={{ fontWeight: "bold" }}>Oda:</Text> {roomDetail.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}><Text style={{ fontWeight: "bold" }}>Günlük Fiyat:</Text> ₺ {roomDetail.price}</Text>
            </View>
            <View style={styles.stepTextContainer}>
              <View style={styles.stepLine} />

              <Text style={[styles.stepText, step == 1 ? styles.stepTextCurrent : styles.stepTextConfirmed]}>
                <MaterialCommunityIcons name={step <= 1 ? "calendar" : "calendar-check"} size={24} />
              </Text>
              <View style={styles.stepLine} />
              <Text style={[styles.stepText, step == 2 ? styles.stepTextCurrent : styles.stepTextUnconfirmed, step >= 3 && styles.stepTextConfirmed]}>
                <MaterialCommunityIcons name={step <= 2 ? "credit-card" : "credit-card-check"} size={24} />
              </Text>
              <View style={styles.stepLine} />
              <Text style={[styles.stepText, step < 3 ? styles.stepTextUnconfirmed : styles.stepTextCurrent, step >= 4 && styles.stepTextConfirmed]}>
                <MaterialCommunityIcons name={step <= 3 ? "check" : "check-all"} size={24} />
              </Text>
              <View style={styles.stepLine} />
            </View>
          </>}

          {step == 1 && renderStep1()}
          {step == 2 && renderStep2()}
          {step >= 3 && renderStep3()}
        </View>
      )}
    </>
  );
};

export default BookingPage;