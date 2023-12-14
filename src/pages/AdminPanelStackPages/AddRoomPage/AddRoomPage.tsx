
import { View, Text, ActivityIndicator, TextInput, ScrollView, Button, Image } from "react-native";
import styles from "./AddRoomPage.style";
import SelectDropdown from 'react-native-select-dropdown';
import { useCallback, useEffect, useState } from "react";
import HotelDto from './../../../types/hotels/hotelDto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HotelService from './../../../services/hotelService';
import { useFocusEffect } from "@react-navigation/native";
import colors from "../../../../colors"
import { RoomType } from '../../../enums/roomType';
import { TouchableOpacity } from "react-native";
import CreateRoomDto from "../../../types/rooms/createRoomDto";
import ImagePickerComponent from './../../../components/ImagePickerComponent/ImagePickerComponent';
import RoomService from './../../../services/roomService';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "react-native-toast-notifications";

const AddRoomPage = ({ navigation }) => {
  const formData = new FormData();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(null);
  const [hotels, setHotels] = useState<HotelDto[]>(null);
  const [roomType, setRoomType] = useState<string[]>(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [room, setRoom] = useState<CreateRoomDto>({
    name: "",
    capacity: 0,
    price: 0,
    description: "",
    hotelId: 0,
    type: RoomType.Standard,
    images: []
  });
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    capacity: "",
    price: "",
    description: "",
    selectedHotelId: "",
    selectedRoomType: "",
  });


  useEffect(() => {
    if (!validateRoomData())
      return;

  }, [room, selectedHotelId, selectedRoomType]);

  const handleSelectedHotel = (selectedItem, index) => {
    setSelectedHotelId(hotels[index].id);
    setRoom((prevData) => ({ ...prevData, hotelId: hotels[index].id }));
  }
  const handleSelectedRoomType = (selectedItem, index) => {
    setSelectedRoomType(RoomType[selectedItem]);
    setRoom((prevData) => ({ ...prevData, type: RoomType[selectedItem] as unknown as RoomType }));
  }

  const validateRoomData = () => {
    const errors = {
      name: "",
      capacity: "",
      price: "",
      description: "",
      selectedHotelId: "",
      selectedRoomType: "",
    };

    if (!room.name) {
      errors.name = 'Oda adı boş bırakılamaz';
    }
    if (room.capacity == 0 || room.capacity == null) {
      errors.capacity = 'Kapasite boş bırakılamaz';
    }
    if (room.price == 0 || room.price == null) {
      errors.price = 'Fiyat boş bırakılamaz';
    }
    if (!room.description) {
      errors.description = 'Açıklama boş bırakılamaz';
    }
    if (selectedHotelId == null) {
      errors.selectedHotelId = 'Otel seçimi yapılmalıdır';
    }
    if (selectedRoomType == null) {
      errors.selectedRoomType = 'Oda türü seçimi yapılmalıdır';
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const getHotels = () => {
    setLoading(true);
    HotelService.getAllForDropdown()
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const getRoomTypes = () => {
    const roomTypesList: string[] = Object.keys(RoomType)
      .filter(key => isNaN(Number(RoomType[key])))
      .map(key => RoomType[key]);
    setRoomType(roomTypesList);
  }
  useFocusEffect(
    useCallback(() => {
      getHotels();
      getRoomTypes();
    }, [])
  );

  const handleInputChange = (key, value) => {
    setRoom((prevData) => ({ ...prevData, [key]: value }));
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
    if (!validateRoomData()) {
      setLoading(false);
      return;
    }
    addImagesToFormData(selectedImageFiles);
    formData.append("Name", room.name);
    formData.append("Capacity", room.capacity.toString());
    formData.append("Price", room.price.toString());
    formData.append("Description", room.description);
    formData.append("HotelId", room.hotelId.toString());
    formData.append("Type", room.type.toString());

    await RoomService.addRoom(formData)
      .then((res) => {
        toast.show(res.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
        navigation.navigate("AdminPanelStack", { screen: "AdminRoomsPage" });
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
        : <>
          {hotels ?
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.inputContainer}>
                  <SelectDropdown
                    data={hotels.map((hotel) => hotel.name)}
                    defaultButtonText="Otel Seçiniz"
                    onSelect={(selectedItem, index) => {
                      handleSelectedHotel(selectedItem, index)
                    }}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
                    buttonStyle={{ ...styles.input }}
                  />
                  {errorMessages.selectedHotelId && <Text style={styles.errorText}>
                    {errorMessages.selectedHotelId} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <SelectDropdown
                    data={roomType}
                    defaultButtonText="Oda Türü Seçiniz"
                    onSelect={(selectedItem, index) => {
                      handleSelectedRoomType(selectedItem, index)
                    }}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
                    buttonStyle={{ ...styles.input }}
                  />
                  {errorMessages.selectedRoomType && <Text style={styles.errorText}>
                    {errorMessages.selectedRoomType} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="pencil" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Oda Adı"
                    onChangeText={(value) => handleInputChange('name', value)}
                  />
                  {errorMessages.name && <Text style={styles.errorText}>
                    {errorMessages.name} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="bed" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Kapasite"
                    keyboardType="numeric"
                    onChangeText={(value) => handleInputChange('capacity', value)}
                  />
                  {errorMessages.capacity && <Text style={styles.errorText}>
                    {errorMessages.capacity} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="currency-try" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Günlük Fiyat"
                    keyboardType="numeric"
                    onChangeText={(value) => handleInputChange('price', value)}
                  />
                  {errorMessages.price && <Text style={styles.errorText}>
                    {errorMessages.price} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="text-box" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Açıklama"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(value) => handleInputChange('description', value)}
                  />
                  {errorMessages.description && <Text style={styles.errorText}>
                    {errorMessages.description} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
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
            </View>
            :
            <>
              <View style={styles.errorContainer} >
                <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                <Text style={styles.errorContainerText}>Herhangi bir otel kaydı bulunamadı. Lütfen önce otel ekleyin.</Text>
              </View>
            </>
          }
        </>}
    </>
  );
}

export default AddRoomPage;
