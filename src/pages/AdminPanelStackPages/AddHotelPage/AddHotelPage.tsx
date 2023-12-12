
import { View, Text } from "react-native";
import styles from "./AddHotelPage.style";
import { useToast } from "react-native-toast-notifications";
import { useEffect, useState } from "react";
import CreateHotelDto from './../../../types/hotels/createHotelDto';
import * as ImagePicker from 'expo-image-picker';
import HotelService from './../../../services/hotelService';
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from "react-native";
import ImagePickerComponent from './../../../components/ImagePickerComponent/ImagePickerComponent';
import { TouchableOpacity } from "react-native";
import colors from './../../../../colors';

const AddHotelPage = ({ navigation }) => {
  const formData = new FormData();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [hotel, setHotel] = useState<CreateHotelDto>({
    name: "",
    address: "",
    description: "",
    star: 0,
    city: "",
    country: "",
    email: "",
    phone: "",
    totalRoomCount: 0,
    website: "",
    images: []
  });
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    address: "",
    description: "",
    star: "",
    city: "",
    country: "",
    totalRoomCount: "",
  });


  useEffect(() => {
    if (!validateHotelData())
      return;

  }, [hotel]);

  const validateHotelData = () => {
    const errors = {
      name: "",
      address: "",
      description: "",
      star: "",
      city: "",
      country: "",
      totalRoomCount: "",
    };

    if (!hotel.name) {
      errors.name = "Otel adı boş bırakılamaz.";
    }
    if (!hotel.address) {
      errors.address = "Adres boş bırakılamaz.";
    }
    if (!hotel.description) {
      errors.description = "Açıklama boş bırakılamaz.";
    }
    if (!hotel.star) {
      errors.star = "Yıldız sayısı boş bırakılamaz.";
    }
    if (!hotel.city) {
      errors.city = "Şehir boş bırakılamaz.";
    }
    if (!hotel.country) {
      errors.country = "Ülke boş bırakılamaz.";
    }
    if (!hotel.totalRoomCount) {
      errors.totalRoomCount = "Oda sayısı boş bırakılamaz.";
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };


  const handleInputChange = (key, value) => {
    setHotel((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleImagesSelected = async (files: ImagePicker.ImagePickerAsset[]) => {
    setSelectedImageFiles(files);
  };

  const addImagesToFormData = (files: ImagePicker.ImagePickerAsset[]) => {
    for (let i = 0; i < files.length; i++) {
      const uriParts = files[i].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const file = {
        uri: files[i].uri,
        name: `photo_${i + 1}.${fileType}`,
        type: `image/${fileType}`,
      } as unknown as Blob;
      formData.append(`Images`, file, file.type);
    }
  }

  const handleAddRoom = async () => {
    setLoading(true);
    if (!validateHotelData()) {
      setLoading(false);
      return;
    }
    addImagesToFormData(selectedImageFiles);
    formData.append('Name', hotel.name);
    formData.append('Address', hotel.address);
    formData.append('Description', hotel.description);
    formData.append('Star', hotel.star.toString());
    formData.append('City', hotel.city);
    formData.append('Country', hotel.country);
    formData.append('Email', hotel.email);
    formData.append('Phone', hotel.phone);
    formData.append('TotalRoomCount', hotel.totalRoomCount.toString());
    formData.append('Website', hotel.website);

    await HotelService.addHotel(formData)
      .then((res) => {
        toast.show(res.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
        navigation.navigate("AdminPanelStack", { screen: "HotelsPage" });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ?
        <>
          <View style={styles.errorContainer} >
            <ActivityIndicator size="large" color="#de2d5f" />
            <Text style={styles.errorContainerText}>Yükleniyor...</Text>
          </View>
        </>
        :
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="pencil" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Otel Adı"
                onChangeText={(value) => handleInputChange('name', value)}
              />
              {errorMessages.name && <Text style={styles.errorText}>
                {errorMessages.name} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="text-box" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Açıklama"
                multiline={true}
                numberOfLines={2}
                onChangeText={(value) => handleInputChange('description', value)}
              />
              {errorMessages.description && <Text style={styles.errorText}>
                {errorMessages.description} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="earth" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ülke"
                onChangeText={(value) => handleInputChange('country', value)}
              />
              {errorMessages.country && <Text style={styles.errorText}>
                {errorMessages.country} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="city" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Şehir"
                onChangeText={(value) => handleInputChange('city', value)}
              />
              {errorMessages.city && <Text style={styles.errorText}>
                {errorMessages.city} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="map-marker" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Adres"
                onChangeText={(value) => handleInputChange('address', value)}
              />
              {errorMessages.address && <Text style={styles.errorText}>
                {errorMessages.address} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="star" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Yıldız Sayısı"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('star', value)}
              />
              {errorMessages.star && <Text style={styles.errorText}>
                {errorMessages.star} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="door" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Oda Sayısı"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('totalRoomCount', value)}
              />
              {errorMessages.totalRoomCount && <Text style={styles.errorText}>
                {errorMessages.totalRoomCount} <MaterialCommunityIcons
                  name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
              }
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="phone" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Telefon"
                keyboardType="phone-pad"
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="web" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Website"
                keyboardType="url"
                onChangeText={(value) => handleInputChange('website', value)}
              />
            </View>
            <ImagePickerComponent
              iconStyle={styles.inputIcon}
              btnContainerStyle={{ ...styles.inputContainer }}
              btnStyle={styles.button}
              btnTextStyle={styles.input}
              onImagesSelected={handleImagesSelected}
            />

            <View style={{ ...styles.inputContainer, backgroundColor: colors.primary, }}>
              <TouchableOpacity style={styles.button} onPress={() => handleAddRoom()}>
                <Text style={styles.buttonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>}
    </>
  );
}

export default AddHotelPage;
