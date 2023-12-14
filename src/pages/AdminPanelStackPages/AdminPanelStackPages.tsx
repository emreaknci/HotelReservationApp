
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./AdminPanelPage.style";
import StorageService from "../../services/storageService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useToast } from "react-native-toast-notifications";
const AdminPanelPage = ({ navigation }) => {
  const toast = useToast();
  const authContext = useContext(AuthContext);
  const [openSubMenuId, setOpenSubMenuId] = useState(null);

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Oteller',
      icon: 'city-variant',
      subMenus: [
        { id: '11', title: 'Görüntüle', icon: 'eye', navigatePage: "AdminHotelsPage", onPress: null },
        { id: '12', title: 'Ekle', icon: 'plus', navigatePage: "AddHotelPage", onPress: null },
      ],
    },
    {
      id: '2',
      title: 'Odalar',
      icon: 'bed',
      subMenus: [
        { id: '21', title: 'Görüntüle', icon: 'eye', navigatePage: "AdminRoomsPage", onPress: null },
        { id: '22', title: 'Ekle', icon: 'plus', navigatePage: "AddRoomPage", onPress: null },
      ],
    },
    {
      id: '3',
      title: 'Kullanıcılar',
      icon: 'account',
      navigatePage: "UsersPage",
      subMenus: null
    },
    {
      id: '4',
      title: 'Rezervasyonlar',
      icon: 'calendar',
      navigatePage: "ReservationsPage",
      subMenus: null
    },
    {
      id: '5',
      title: 'Ödemeler',
      icon: 'currency-try',
      navigatePage: "PaymentsPage",
      subMenus: null
    },
  ];

  const renderItem = ({ item }: { item: MenuItem }) => (
    <>
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
    </>
  );

  const renderSubMenuOption = ({ item }) => (
    <TouchableOpacity
      style={styles.subMenuItem}
      activeOpacity={0.75}
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
      navigation.navigate(subMenu.navigatePage);
    }
  };

  return (
    <>
      <HeaderComponent />

      <View style={styles.container}>
        <View style={styles.adminInfoHeader} >
          <Text style={styles.adminInfoHeaderText}>ADMIN: {authContext.user.email}</Text>
        </View >
        <MaterialCommunityIcons name="shield-account" style={[styles.headerIcon, { fontSize: 100 }]} />
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View></>
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

export default AdminPanelPage;
