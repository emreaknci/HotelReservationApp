import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CarouselComponent from '../CarouselComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  btnContainerStyle?: any;
  btnStyle?: any;
  btnTextStyle?: any;
  iconStyle?: any;
  onImagesSelected?: (files: ImagePicker.ImagePickerAsset[]) => void;
}

export default function ImagePickerComponent({ btnContainerStyle, btnStyle, btnTextStyle, iconStyle, onImagesSelected }: Props) {
  const [carouselItems, setCarouselItems] = useState([]);

  const pickImage = async () => {
    setCarouselItems([])
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,

    });

    if (!result.canceled) {

      const pickedImages = result.assets.map((asset, index) => ({
        id: index + 1,
        image: asset.uri,
        title: `Image ${index + 1}`,
      }));

      setCarouselItems(pickedImages);

      if (onImagesSelected) {
        onImagesSelected(result.assets);
      }
    }
  };

  const deleteImages = () => {
    setCarouselItems([]);
    if (onImagesSelected) {
      onImagesSelected([]);
    }
  }
  return (
    <>
      <View style={btnContainerStyle}>
        <MaterialCommunityIcons name="image-multiple" style={iconStyle} />
        <TouchableOpacity style={{ ...btnStyle }} onPress={pickImage}>
          <Text style={btnTextStyle}>Resim seç</Text>
        </TouchableOpacity>
      </View>
      {carouselItems.length > 0 && (
        <>
          <View style={btnContainerStyle}>
            <MaterialCommunityIcons name="trash-can" style={iconStyle} />
            <TouchableOpacity style={{ ...btnStyle }} onPress={deleteImages}>
              <Text style={btnTextStyle}>Kaldır</Text>
            </TouchableOpacity>
          </View>
          <CarouselComponent
            data={carouselItems}
            isLocalImage={true}
          />
        </>
      )}

    </>
  );
}
