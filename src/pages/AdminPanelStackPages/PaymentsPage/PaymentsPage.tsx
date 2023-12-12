
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import styles from "./PaymentsPage.style";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import colors from './../../../../colors';
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PaymentService from './../../../services/paymentService';
import { PaymentStatus } from '../../../enums/paymentStatus';
import PaymentDto from './../../../types/payments/paymentDto';
import { useToast } from "react-native-toast-notifications";
import { format } from 'date-fns';
import { tr } from "date-fns/locale";

const PaymentsPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setStartDateShow] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setEndDateShow] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string[]>([
    'Tümü',
    'Ödenenler',
    'İptal Edilenler'
  ]);
  const [paymentDto, setPaymentDto] = useState<PaymentDto>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('Tümü');
  const onStartDateChange = (selectedDate) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp) || startDate;
    setStartDateShow(false);
    setStartDate(currentDate);
  };
  const onEndDateChange = (selectedDate) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp) || endDate;
    setEndDateShow(false);
    setEndDate(currentDate);
  };
  const handleSelectedPaymentStatus = (selectedItem, index) => {
    setSelectedPaymentStatus(selectedItem);
  }
  const setStatus=()=>{
    if(selectedPaymentStatus==='Tümü'){
      return null;
    }
    else if(selectedPaymentStatus==='Ödenenler'){
      return PaymentStatus.Paid;
    }
    else if(selectedPaymentStatus==='İptal Edilenler'){
      return PaymentStatus.Canceled;
    }
  }
  const getPayments = () => {
    setLoading(true);
    let status = setStatus();

    PaymentService.getAllInDateRange(startDate.toISOString(), endDate.toISOString(), status)
      .then((response) => {
        setPaymentDto(response.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
        setPaymentDto(null);
        if (err.response.data)
          toast.show(err.response.data, {
            type: "custom_type",
            placement: "center",
            animationType: "zoom-in",
            swipeEnabled: true,
          });
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const renderInput = () => {
    return (
      <>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonContainerRow}>
            <Text style={styles.buttonContainerText}>
              Başlangıç Tarihi:
            </Text>
            <Text style={styles.buttonContainerText}>
              Çıkış Tarihi:
            </Text>
          </View>

          <View style={styles.buttonContainerRow}>

            <Text style={styles.buttonContainerText}>
              {startDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>

            <Text style={styles.buttonContainerText}>
              {endDate.toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
          </View>
          <View style={styles.buttonContainerRow}>
            <TouchableOpacity style={styles.button} onPress={() => setStartDateShow(true)}>
              <Text style={styles.buttonText}>Başlangıç Tarihi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setEndDateShow(true)}>
              <Text style={styles.buttonText}>Bitiş Tarihi</Text>
            </TouchableOpacity>
          </View>
          <SelectDropdown
            data={paymentStatus}
            defaultButtonText="Ödeme Durumu"
            onSelect={(selectedItem, index) => {
              handleSelectedPaymentStatus(selectedItem, index)
            }}
            dropdownIconPosition='right'
            renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
            buttonStyle={{ ...styles.input }}
          />
          <TouchableOpacity style={{ ...styles.searchButton }} onPress={() => getPayments()}>
            <Text style={styles.buttonText}>Ara</Text>
          </TouchableOpacity>
        </View>
        {showStartDate && <DateTimePicker
          locale="tr-TR"
          value={startDate}
          onChange={onStartDateChange}
          maximumDate={new Date()}
          display="spinner"
          positiveButton={{ label: 'Seç', textColor: colors.primary }}
          negativeButton={{ label: 'İptal', textColor: colors.primary }}
        />}
        {showEndDate && <DateTimePicker
          locale="tr-TR"
          value={endDate}
          onChange={onEndDateChange}
          minimumDate={startDate}
          maximumDate={new Date()}
          display="spinner"
          positiveButton={{ label: 'Seç', textColor: colors.primary }}
          negativeButton={{ label: 'İptal', textColor: colors.primary }}
        />}
      </>
    )
  }
  return (

    <View style={styles.container}>
      {renderInput()}

      <>
        {loading ?
          <>
            <View style={styles.errorContainer} >
              <ActivityIndicator size="large" color="#de2d5f" />
              <Text style={styles.errorContainerText}>Yükleniyor...</Text>
            </View>
          </>
          :
          <>
            {paymentDto && paymentDto.payments.length === 0 ?
              <View style={styles.errorContainer} >
                <Text style={styles.errorContainerText}>Ödeme bulunamadı</Text>
              </View> :
              <>
                <ScrollView showsVerticalScrollIndicator={false}>

                  {paymentDto &&
                    <View style={styles.paymentContainer}>
                      <View style={styles.paymentRow}>
                        <Text style={{ ...styles.paymentText, fontSize: 18, color: "green" }}>
                          Toplam Ödeme (Ödenen)
                        </Text>
                        <Text style={{ ...styles.paymentText, color: "green" }}>
                          ₺ {paymentDto.totalAmount}
                        </Text>
                      </View>
                      <View style={styles.paymentRow}>
                        <Text style={{ ...styles.paymentText, fontSize: 18 }}>
                          Toplam Ödeme Sayısı
                        </Text>
                        <Text style={{ ...styles.paymentText }}>
                          {paymentDto.totalPaymentCount}
                        </Text>
                      </View>
                      <View style={styles.paymentRow}>
                        <Text style={{ ...styles.paymentText, fontSize: 18, color: "green" }}>
                          Toplam Ödenen
                        </Text>
                        <Text style={{ ...styles.paymentText, color: "green" }}>
                          {paymentDto.totalPaidCount}
                        </Text>
                      </View>
                      <View style={styles.paymentRow}>
                        <Text style={{ ...styles.paymentText, fontSize: 18, color: colors.primary }}>
                          Toplam İptal Edilen
                        </Text>
                        <Text style={{ ...styles.paymentText, color: colors.primary }}>
                          {paymentDto.totalCanceledCount}
                        </Text>
                      </View>

                    </View>
                  }

                  {paymentDto?.payments?.map((payment) => {
                    return (
                      <View style={styles.paymentContainer} key={payment.id}>
                        <View style={styles.paymentRow}>
                          <Text style={{ ...styles.paymentText, fontSize: 18, color: payment.paymentStatus === PaymentStatus.Paid ? "green" : colors.primary }}>
                            #{payment.id}
                          </Text>
                          <Text style={{ ...styles.paymentText, color: payment.paymentStatus === PaymentStatus.Paid ? "green" : colors.primary }}>
                            ₺ {payment.amount}
                          </Text>
                        </View>
                        <View style={styles.paymentRow}>
                          <Text style={{ ...styles.paymentText, color: payment.paymentStatus === PaymentStatus.Paid ? "green" : colors.primary }}>
                            {Date.parse(payment.paymentDate.toString())}
                          </Text>
                          <Text style={{ ...styles.paymentText, color: payment.paymentStatus === PaymentStatus.Paid ? "green" : colors.primary }}>
                            {payment.paymentStatus === PaymentStatus.Paid ? 'Ödendi' : 'İptal Edildi'}
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                </ScrollView>
              </>

            }


          </>
        }

      </>

    </View>

  );
}

export default PaymentsPage;
