
import { View, Text, ActivityIndicator, ScrollView, TextInput, Image } from "react-native";
import styles from "./EditHotelPage.style";
import React, { useEffect, useState } from "react";
import HotelDetailDto from './../../../types/hotels/hotelDetailDto';
import HotelService from './../../../services/hotelService';
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImagePickerComponent from './../../../components/ImagePickerComponent/ImagePickerComponent';
import { TouchableOpacity } from "react-native";
import colors from './../../../../colors';
import UpdateHotelDto from './../../../types/hotels/updateHotelDto';
import CheckBoxComponent from './../../../components/CheckBoxComponent/CheckBoxComponent';

const EditHotelPage = ({ route, navigation }) => {
  const { id } = route.params;
  const formData = new FormData();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [hotel, setHotel] = useState<HotelDetailDto>();
  const [editedHotel, setEditedHotel] = useState<UpdateHotelDto>();
  const [toggleAvailableImagesVisibility, setToggleAvailableImagesVisibility] = useState<boolean>(false);
  const [imagePathsToDelete, setImagePathsToDelete] = useState<string[]>([]);
  const [imageCheckStates, setImageCheckStates] = useState([]);
  const handleCheckBoxPress = (index, imagePath) => {
    const newCheckStates = [...imageCheckStates];
    newCheckStates[index] = !newCheckStates[index];
    setImageCheckStates(newCheckStates);

    if (newCheckStates[index]) {
      setImagePathsToDelete((prevPaths) => [...prevPaths, imagePath]);
    } else {
      setImagePathsToDelete((prevPaths) => prevPaths.filter((path) => path !== imagePath));
    }
  };
  useEffect(() => {
    console.log("Selected Image Paths:", imagePathsToDelete)
    setEditedHotel((prevData) => ({ ...prevData, imagePathsToDelete: imagePathsToDelete }));
  }, [imagePathsToDelete]);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    address: "",
    description: "",
    star: "",
    city: "",
    country: "",
    totalRoomCount: "",
  });

  const handleToggleVisibility = () => {
    setToggleAvailableImagesVisibility(!toggleAvailableImagesVisibility);
  };

  const getCurrentHotelDetail = (hotelId) => {
    setLoading(true);
    HotelService.getByIdWithImages(hotelId)
      .then((res) => {
        var hotel = res.data.data;
        setHotel(hotel);
        setEditedHotel({
          id: hotel.id,
          name: hotel.name,
          address: hotel.address,
          description: hotel.description,
          star: hotel.star,
          city: hotel.city,
          country: hotel.country,
          email: hotel.email,
          phone: hotel.phone,
          totalRoomCount: hotel.totalRoomCount,
          website: hotel.website,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    if (!id) return;
    getCurrentHotelDetail(id);
  }, [id])

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

    if (!editedHotel.name) {
      errors.name = "Otel adı boş bırakılamaz.";
    }
    if (!editedHotel.address) {
      errors.address = "Adres boş bırakılamaz.";
    }
    if (!editedHotel.description) {
      errors.description = "Açıklama boş bırakılamaz.";
    }
    if (!editedHotel.star) {
      errors.star = "Yıldız sayısı boş bırakılamaz.";
    }
    if (!editedHotel.city) {
      errors.city = "Şehir boş bırakılamaz.";
    }
    if (!editedHotel.country) {
      errors.country = "Ülke boş bırakılamaz.";
    }
    if (!editedHotel.totalRoomCount) {
      errors.totalRoomCount = "Oda sayısı boş bırakılamaz.";
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  useEffect(() => {
    if (editedHotel)
      validateHotelData()
  }, [editedHotel])

  const handleInputChange = (key, value) => {
    setEditedHotel((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleImagesSelected = async (files: ImagePicker.ImagePickerAsset[]) => {
    setSelectedImageFiles(files);
  };

  const addEditedHotelToFormData = (files: ImagePicker.ImagePickerAsset[]) => {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const uriParts = files[i].uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        const file = {
          uri: files[i].uri,
          name: `photo_${i + 1}.${fileType}`,
          type: `image/${fileType}`,
        } as unknown as Blob;
        formData.append(`NewImages`, file, file.type);
      }
    }
    if (editedHotel.imagePathsToDelete?.length > 0) {
      editedHotel.imagePathsToDelete.forEach((path) => {
        formData.append('ImagePathsToDelete', path);
      });
    }
    formData.append('Id', editedHotel.id.toString());
    formData.append('Name', editedHotel.name);
    formData.append('Address', editedHotel.address);
    formData.append('Description', editedHotel.description);
    formData.append('Star', editedHotel.star.toString());
    formData.append('City', editedHotel.city);
    formData.append('Country', editedHotel.country);
    formData.append('TotalRoomCount', editedHotel.totalRoomCount.toString());
    if (editedHotel.email != null)
      formData.append('Email', editedHotel.email);
    if (editedHotel.phone != null)
      formData.append('Phone', editedHotel.phone);
    if (editedHotel.website != null)
      formData.append('Website', editedHotel.website);
    return formData;
  };

  const handleAddRoom = async () => {
    setLoading(true);
    if (!validateHotelData()) {
      setLoading(false);
      return;
    }
    let formData = addEditedHotelToFormData(selectedImageFiles);
    await HotelService.updateHotel(formData)
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
        console.log(err)
        console.log(err.response)
        if (err.response.data)
          toast.show(err.response.data.message, {
            type: "custom_type",
            placement: "center",
            animationType: "zoom-in",
            swipeEnabled: true,
          });
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
                value={editedHotel?.name}
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
                value={editedHotel?.description}
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
                value={editedHotel?.country}
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
                value={editedHotel?.city}
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
                value={editedHotel?.address}
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
                value={editedHotel?.star.toString()}
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
                value={editedHotel?.totalRoomCount.toString()}
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
                value={editedHotel?.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="phone" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Telefon"
                keyboardType="phone-pad"
                value={editedHotel?.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="web" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Website"
                keyboardType="url"
                value={editedHotel?.website}
                onChangeText={(value) => handleInputChange('website', value)}
              />
            </View>
            {(imagePathsToDelete && imagePathsToDelete.length >= 0) && < ImagePickerComponent
              iconStyle={styles.inputIcon}
              btnContainerStyle={{ ...styles.inputContainer }}
              btnStyle={styles.button}
              btnTextStyle={styles.input}
              onImagesSelected={handleImagesSelected}
              selectionLimit={5 - hotel?.images.length + imagePathsToDelete.length}
            />}
            {hotel?.images &&
              <>
               {!hotel?.images.some(image => image.includes('no-image')) && <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="image-multiple-outline" style={styles.inputIcon} />
                  <TouchableOpacity style={styles.button} onPress={() => handleToggleVisibility()}>
                    <Text style={styles.input}>Mevcut Resimleri Gör</Text>
                  </TouchableOpacity>
                </View>}
                {toggleAvailableImagesVisibility &&
                  <View style={styles.imageContainer}>
                    <Text style={styles.input}>Silmek istediklerinizi işaretleyin</Text>
                    <ScrollView horizontal={true} style={styles.imageScrollContainer}>
                      {hotel?.images.map((image, index) => (
                        <View style={styles.imageItem} key={index}>
                          <Image source={{ uri: process.env.EXPO_PUBLIC_API_URL + image }} style={styles.image} />
                          <CheckBoxComponent
                            isChecked={imageCheckStates[index]}
                            onPress={() => handleCheckBoxPress(index, image)}
                            size={24}
                          />
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                }
              </>}
            <View style={{ ...styles.inputContainer, backgroundColor: colors.primary, }}>
              <TouchableOpacity style={styles.button} onPress={() => handleAddRoom()}>
                <Text style={styles.buttonText}>Güncelle</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>}
    </>
  );
}


export default EditHotelPage;
