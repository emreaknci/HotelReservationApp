
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, FlatList } from "react-native";
import styles from "./UsersPage.style";
import { useCallback, useContext, useEffect, useState } from "react";
import UserService from './../../../services/userService';
import { useFocusEffect } from "@react-navigation/native";
import AppUser from './../../../types/appUser';
import { useToast } from "react-native-toast-notifications";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserType } from "../../../enums/userType";
import colors from "../../../../colors"
import { AuthContext } from './../../../context/AuthContext';

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<AppUser[]>();
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const authContext = useContext(AuthContext);
  const getAllUsers = () => {
    setLoading(true);
    UserService.getAll()
      .then((response) => {
        setUsers(response.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useFocusEffect(
    useCallback(() => {
      getAllUsers();
    }, [])
  );
  useEffect(() => {
    if (!users) return;
    if (searchText === "") {
      getAllUsers();
      return;
    }

    const filteredUsers = users.filter(user =>
      (user.firstName + " " + user.lastName).toLowerCase().includes(searchText.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchText]);

  const changeUserType = (userId: number) => {
    setLoading(true);
    UserService.changeUserType(userId)
      .then((response) => {
        getAllUsers();
      })
      .catch((err) => {
        console.log(err.response.data.message)
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
  }
  const changeAccountStatus = (userId: number) => {
    setLoading(true);
    UserService.changeAccountStatus(userId)
      .then((response) => {
        getAllUsers();
      })
      .catch((err) => {
        console.log(err.response.data.message)
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
  }
  const handleChangeUserType = (userId: number) => {
    changeUserType(userId);
  }
  const handleChangeAccountStatus = (userId: number) => {
    changeAccountStatus(userId);
  }

  const renderUserCard = (user: AppUser) => {
    return (
      <>
        <View style={styles.userCard}>

          <View style={styles.userInfoContainer}>

            <View style={styles.userCardHeader}>

              <View style={styles.userCardBody}>
                <Text style={styles.userCardHeaderText}>Kullanıcı:</Text>
                <Text style={styles.userCardHeaderText}>#{user.id}</Text>
              </View>
              <View style={styles.userCardBody}>
                <Text style={styles.userCardBodyText}>Ad:</Text>
                <Text style={styles.userCardBodyText}>{user.firstName}</Text>
              </View>
              <View style={styles.userCardBody}>
                <Text style={styles.userCardBodyText}>Soyad:</Text>
                <Text style={styles.userCardBodyText}>{user.lastName}</Text>
              </View>
              <View style={styles.userCardBody}>
                <Text style={styles.userCardBodyText}>Mail:</Text>
                <Text style={styles.userCardBodyText}>{user.email}</Text>
              </View>
              <View style={styles.userCardBody}>
                <Text style={styles.userCardBodyText}>Kullanıcı Türü:</Text>
                <Text style={styles.userCardBodyText}>{UserType[user.userType]}</Text>
              </View>
              <View style={styles.userCardBody}>
                <Text style={styles.userCardBodyText}>Üye Olma Tarihi:</Text>
                <Text style={styles.userCardBodyText}>{user.createdDate.toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
              </View>
            </View>

          </View>

          <View style={styles.userCardBodyButtonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={{
              ...styles.userCardBodyButton,
              borderBottomLeftRadius: 10,
              backgroundColor: authContext.user.id == user.id ? colors.secondary : colors.primary

            }}
              disabled={authContext.user.id == user.id}
              onPress={() => handleChangeUserType(user.id)}
            >
              <Text style={styles.userCardBodyButtonText}>
                {authContext.user.id == user.id ? "Kendi Yetkinizi Kaldıramazsınız" : (user.userType === UserType.Customer ? "Admin Yetkisi Ver" : "Admin Yetkisini Kaldır")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{
              ...styles.userCardBodyButton,
              borderBottomRightRadius: 10,
              backgroundColor: authContext.user.id == user.id ? colors.secondary : colors.primary
            }}
              disabled={authContext.user.id == user.id}
              onPress={() => handleChangeAccountStatus(user.id)}
            >
              <Text style={styles.userCardBodyButtonText}>
                {authContext.user.id == user.id ? "Kendi Hesabınızı Askıya Alamazsınız" : (user.status ? "Hesabı Askıya Al" : "Hesabı Aktif Et")}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </>
    )
  }


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
          {users ?
            <View style={styles.container}>
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
                <TextInput style={styles.searchInput} onChangeText={(text) => setSearchText(text)} placeholder="Kullanıcı Adına Göre Ara..." />
              </View>
              <FlatList
                data={users}
                renderItem={({ item: user }) => (renderUserCard(user))}
                keyExtractor={(user) => user.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.userContainer} />
            </View> :
            <>
              <View style={styles.errorContainer} >
                <MaterialCommunityIcons name="alert-circle-outline" style={styles.errorContainerIcon} />
                <Text style={styles.errorContainerText}>Kullanıcı kaydı bulunamadı.</Text>
              </View>
            </>}
        </>}
    </>
  );
}

export default UsersPage;
