
import { View, Text, ActivityIndicator, ScrollView, TextInput, Image } from "react-native";
import styles from "./EditRoomPage.style";
import React, { useCallback, useEffect, useState } from "react";
import RoomDetailDto from './../../../types/rooms/roomDetailDto';
import RoomService from './../../../services/roomService';
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImagePickerComponent from './../../../components/ImagePickerComponent/ImagePickerComponent';
import { TouchableOpacity } from "react-native";
import colors from './../../../../colors';
import UpdateRoomDto from './../../../types/rooms/updateRoomDto';
import CheckBoxComponent from './../../../components/CheckBoxComponent/CheckBoxComponent';
import SelectDropdown from "react-native-select-dropdown";
import HotelDto from './../../../types/hotels/hotelDto';
import HotelService from './../../../services/hotelService';
import { RoomType } from "../../../enums/roomType";
import { useFocusEffect } from "@react-navigation/native";

const EditRoomPage = ({ route, navigation }) => {
  const { id } = route.params;
  const formData = new FormData();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [room, setRoom] = useState<RoomDetailDto>();
  const [editedRoom, setEditedRoom] = useState<UpdateRoomDto>();
  const [toggleAvailableImagesVisibility, setToggleAvailableImagesVisibility] = useState<boolean>(false);
  const [imagePathsToDelete, setImagePathsToDelete] = useState<string[]>([]);
  const [imageCheckStates, setImageCheckStates] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState<number>(null);
  const [hotels, setHotels] = useState<HotelDto[]>(null);
  const [roomType, setRoomType] = useState<string[]>(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);


  const handleSelectedHotel = (selectedItem, index) => {
    setSelectedHotelId(hotels.find((hotel) => hotel.name === selectedItem).id);
    setEditedRoom((prevData) => ({ ...prevData, hotelId: hotels.find((hotel) => hotel.name === selectedItem).id }));
  }
  const handleSelectedRoomType = (selectedItem, index) => {
    setSelectedRoomType(RoomType[selectedItem]);
    setEditedRoom((prevData) => ({ ...prevData, type: RoomType[selectedItem] as unknown as RoomType }));
  }
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
    setEditedRoom((prevData) => ({ ...prevData, imagePathsToDelete: imagePathsToDelete }));
  }, [imagePathsToDelete]);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    capacity: "",
    description: "",
    price: "",
  });

  const handleToggleVisibility = () => {
    setToggleAvailableImagesVisibility(!toggleAvailableImagesVisibility);
  };

  const getCurrentRoomDetail = (roomId) => {
    setLoading(true);
    RoomService.getRoomByIdWithImages(roomId)
      .then((res) => {
        var room = res.data.data;
        setRoom(room);
        setEditedRoom({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          description: room.description,
          hotelId: room.hotelId,
          price: room.price,
          type: room.type,
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
    getCurrentRoomDetail(id);
  }, [id])

  const validateRoomData = () => {
    const errors = {
      name: "",
      capacity: "",
      description: "",
      price: "",
    };

    if (!editedRoom.name) {
      errors.name = "Otel adı boş bırakılamaz.";
    }
    if (!editedRoom.capacity) {
      errors.capacity = "Kapasite boş bırakılamaz.";
    }
    if (!editedRoom.description) {
      errors.description = "Açıklama boş bırakılamaz.";
    }
    if (!editedRoom.price) {
      errors.price = "Fiyat boş bırakılamaz.";
    }

    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  useEffect(() => {
    if (editedRoom)
      validateRoomData()
  }, [editedRoom])

  const handleInputChange = (key, value) => {
    setEditedRoom((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleImagesSelected = async (files: ImagePicker.ImagePickerAsset[]) => {
    setSelectedImageFiles(files);
  };

  const addEditedRoomToFormData = (files: ImagePicker.ImagePickerAsset[]) => {
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
    if (editedRoom.imagePathsToDelete?.length > 0) {
      editedRoom.imagePathsToDelete.forEach((path) => {
        formData.append('ImagePathsToDelete', path);
      });
    }
    formData.append('Id', editedRoom.id.toString());
    formData.append('Name', editedRoom.name);
    formData.append('Capacity', editedRoom.capacity.toString());
    formData.append('Description', editedRoom.description);
    formData.append('HotelId', editedRoom.hotelId.toString());
    formData.append('Price', editedRoom.price.toString());
    formData.append('Type', editedRoom.type.toString());

    return formData;
  };


  const handleAddRoom = async () => {
    setLoading(true);
    if (!validateRoomData()) {
      setLoading(false);
      return;
    }
    let formData = addEditedRoomToFormData(selectedImageFiles);
    await RoomService.updateRoom(formData)
      .then((res) => {
        toast.show(res.data.message, {
          type: "custom_type",
          placement: "center",
          animationType: "zoom-in",
          swipeEnabled: true,
        });
        navigation.navigate("AdminPanelStack", { screen: "RoomsPage" });
      })
      .catch((err) => {
        console.log(err)
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
        : <>
          {hotels &&
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.inputContainer}>
                  <SelectDropdown
                    data={hotels.map((hotel) => hotel.name)}
                    defaultButtonText="Otel Seçiniz"
                    defaultValue={room?.hotelName}
                    onSelect={(selectedItem, index) => {
                      handleSelectedHotel(selectedItem, index)
                    }}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
                    buttonStyle={{ ...styles.input }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <SelectDropdown
                    data={roomType}
                    defaultButtonText="Oda Türü Seçiniz"
                    defaultValue={room?.type}
                    defaultValueByIndex={room?.type}
                    onSelect={(selectedItem, index) => {
                      handleSelectedRoomType(selectedItem, index)
                    }}
                    dropdownIconPosition='right'
                    renderDropdownIcon={() => <MaterialCommunityIcons name="chevron-down" style={styles.inputIcon} />}
                    buttonStyle={{ ...styles.input }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="pencil" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Otel Adı"
                    value={editedRoom?.name}
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
                    value={editedRoom?.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                  />
                  {errorMessages.description && <Text style={styles.errorText}>
                    {errorMessages.description} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="account-group" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Kapasite"
                    value={editedRoom?.capacity?.toString()}
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
                    placeholder="Fiyat"
                    value={editedRoom?.price?.toString()}
                    onChangeText={(value) => handleInputChange('price', value)}
                  />
                  {errorMessages.price && <Text style={styles.errorText}>
                    {errorMessages.price} <MaterialCommunityIcons
                      name='alert-circle-outline' style={[styles.errorIcon]} /> </Text>
                  }
                </View>

                {(imagePathsToDelete && imagePathsToDelete.length >= 0) && < ImagePickerComponent
                  iconStyle={styles.inputIcon}
                  btnContainerStyle={{ ...styles.inputContainer }}
                  btnStyle={styles.button}
                  btnTextStyle={styles.input}
                  onImagesSelected={handleImagesSelected}
                  selectionLimit={5 - room?.images.length + imagePathsToDelete.length}
                />}
                {room?.images &&
                  <>
                    {!room?.images.some(image => image.includes('no-image')) && <View style={styles.inputContainer}>
                      <MaterialCommunityIcons name="image-multiple-outline" style={styles.inputIcon} />
                      <TouchableOpacity style={styles.button} onPress={() => handleToggleVisibility()}>
                        <Text style={styles.input}>Mevcut Resimleri Gör</Text>
                      </TouchableOpacity>
                    </View>}
                    {toggleAvailableImagesVisibility &&
                      <View style={styles.imageContainer}>
                        <Text style={styles.input}>Silmek istediklerinizi işaretleyin</Text>
                        <ScrollView horizontal={true} style={styles.imageScrollContainer}>
                          {room?.images.map((image, index) => (
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

      }
    </>
  );
}


export default EditRoomPage;
