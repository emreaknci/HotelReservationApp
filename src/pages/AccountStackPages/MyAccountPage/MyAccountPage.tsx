
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, FlatList } from "react-native";
import styles from "./MyAccountPage.style";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyAccountPage = ({ navigation }) => {
  const toast = useToast();
  const authContext = useContext(AuthContext);
  const [openSubMenuId, setOpenSubMenuId] = useState(null);

  const logout = async () => {
    await authContext.logOut();
    navigation.navigate("LoginPage");
    toast.show("Çıkış Başarılı!", {
      type: "custom_type",
      placement: "center",
      animationType: "zoom-in",
      swipeEnabled: true,
    });
  }
  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Hesap Bilgilerini Güncelle',
      icon: 'account-edit',
      subMenus: [
        { id: '11', title: 'Şifre Değiştir', icon: 'lock', navigatePage: null, onPress: null },
        { id: '12', title: 'Ad ve Soyad Değiştir', icon: 'account-circle', navigatePage: null, onPress: null },
      ],
    },
    {
      id: '2', title: 'Ayarlar', icon: 'cog', navigatePage: null, onPress: null, subMenus: [
        { id: '21', title: 'Bildirim Ayarları', icon: 'bell', navigatePage: null, onPress: null },
        { id: '22', title: 'Ses Ayarları', icon: 'volume-high', navigatePage: null, onPress: null },
        { id: '23', title: 'Dil Ayarları', icon: 'translate', navigatePage: null, onPress: null },
        { id: '24', title: 'Tema Değiştir', icon: 'theme-light-dark', navigatePage: null, onPress: null },
      ],
    },
    { id: '3', title: 'Yardım', icon: 'help-circle', navigatePage: null, onPress: null },
    { id: '4', title: 'Çıkış Yap', icon: 'logout', onPress: logout },
  ];

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuItemPress(item)}
        activeOpacity={0.75}
      >
        <MaterialCommunityIcons name={item.icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.title}</Text>
      </TouchableOpacity>
      {openSubMenuId === item.id && (
        <View style={styles.subMenu}>
          <FlatList
            data={item.subMenus}
            keyExtractor={(option) => option.id}
            renderItem={renderSubMenuOption}
          />
        </View>
      )}
    </View>
  );

  const renderSubMenuOption = ({ item }) => (
    <TouchableOpacity
      style={styles.subMenuItem}
      onPress={() => handleSubMenuOptionPress(item)}
    >
      <MaterialCommunityIcons name={item.icon} style={styles.subMenuIcon} />
      <Text style={styles.subMenuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleMenuItemPress = (menuItem) => {
    if (menuItem.subMenus) {
      setOpenSubMenuId(openSubMenuId === menuItem.id ? null : menuItem.id);
    };
    if (menuItem.navigatePage) {
      console.log(menuItem.navigatePage)
      navigation.navigate(menuItem.navigatePage);
    }
    if (menuItem.onPress) {
      menuItem.onPress();
    }
  };

  const handleSubMenuOptionPress = (subMenu) => {
    if (subMenu.onPress) {
      subMenu.onPress();
    }
    if (subMenu.navigatePage) {
      console.log(subMenu.navigatePage)
      navigation.navigate(subMenu.navigatePage);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" style={[styles.headerIcon, { fontSize: 100 }]} />
      <Text style={styles.title}>{authContext.user?.fullName}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
interface MenuItem {
  id: string;
  title: string;
  icon: any;
  subMenus?: SubMenuItem[] | null;
  navigatePage?: string | null;
  onPress?: () => void;
}

interface SubMenuItem {
  id: string;
  title: string;
  icon: any;
  navigatePage?: string | null;
  onPress?: () => void;
}
export default MyAccountPage;
