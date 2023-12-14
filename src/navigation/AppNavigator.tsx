import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import colors from '../../colors';
import baseStyles from "../../styles"
import AdminPanelStackPages from '../pages/AdminPanelStackPages';
import LoginPage from '../pages/AccountStackPages/LoginPage';
import RegisterPage from '../pages/AccountStackPages/RegisterPage';
import MyAccountPage from '../pages/AccountStackPages/MyAccountPage';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeStackPages from '../pages/HomeStackPages';
import ChangePasswordPage from '../pages/AccountStackPages/ChangePasswordPage';
import HotelDetailPage from "../pages/HomeStackPages/HotelDetailPage/HotelDetailPage"
import RoomDetailPage from '..//pages/HomeStackPages/HotelDetailPage/RoomDetailPage/RoomDetailPage';
import BookingPage from './../pages/ReservationStackPages/BookingPage/BookingPage';
import MyReservationsPage from './../pages/ReservationStackPages/MyReservationsPage/MyReservationsPage';
import AdminHotelsPage from './../pages/AdminPanelStackPages/HotelsPage/HotelsPage';
import AdminRoomsPage from './../pages/AdminPanelStackPages/RoomsPage/RoomsPage';
import UsersPage from './../pages/AdminPanelStackPages/UsersPage/UsersPage';
import AddHotelPage from './../pages/AdminPanelStackPages/AddHotelPage/AddHotelPage';
import AddRoomPage from './../pages/AdminPanelStackPages/AddRoomPage/AddRoomPage';
import EditHotelPage from './../pages/AdminPanelStackPages/EditHotelPage/EditHotelPage';
import EditRoomPage from './../pages/AdminPanelStackPages/EditRoomPage/EditRoomPage';
import ReservationsPage from './../pages/AdminPanelStackPages/ReservationsPage/ReservationsPage';
import PaymentsPage from './../pages/AdminPanelStackPages/PaymentsPage/PaymentsPage';
import HomeHotelsPage from './../pages/HomeStackPages/HotelsPage/HotelsPage';
import HomeRoomsPage from './../pages/HomeStackPages/RoomsPage/RoomsPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeStack = () => {

  return (
    <>
      <Stack.Navigator screenOptions={{ ...commonScreenOptions, headerShown: false }}>
        <Stack.Screen name="HomeStackPages" component={HomeStackPages} />
        <Stack.Screen name="HotelDetailPage" component={HotelDetailPage} options={({ route }) => {
          const title = route.params && route.params["title"] ? route.params["title"] : "Otel Detayı";
          return {
            headerShown: true, title: title, headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
          };
        }} />
        <Stack.Screen name="RoomDetailPage" component={RoomDetailPage} options={({ route }) => {
          const title = route.params && route.params["title"] ? route.params["title"] : "Oda Detayı";
          return {
            headerShown: true, title: title, headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
          };
        }} />
        <Stack.Screen name="HomeHotelsPage" component={HomeHotelsPage} options={({ route }) => {
          return {
            headerShown: true, title: "Oteller", headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
          };
        }} />
          <Stack.Screen name="HomeRoomsPage" component={HomeRoomsPage} options={({ route }) => {
          return {
            headerShown: true, title: "Odalar", headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
          };
        }} />
        
      </Stack.Navigator>
    </>

  );
};

const ReservationStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions} initialRouteName="MyReservationsPage">
      <Stack.Screen name="MyReservationsPage" component={MyReservationsPage}
        options={
          {
            headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center",
            headerLeft: null
          }

        }
      />
      <Stack.Screen
        name="BookingPage"
        component={BookingPage}
        options={({ route, navigation }) => {
          const title = route.params && route.params["title"] ? route.params["title"] : "Rezervasyon Yap";
          return {
            headerShown: true,
            title: title,
            headerTintColor: colors.text,
            headerStyle: { backgroundColor: colors.primary },
            headerTitleAlign: "center",
          };
        }}
      />
    </Stack.Navigator>
  )
}

const AccountStack = () => {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <>
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name={isAuthenticated ? "MyAccountPage" : "LoginPage"}
          component={isAuthenticated ? MyAccountPage : LoginPage} />
        {!isAuthenticated && <Stack.Screen name="RegisterPage" component={RegisterPage} />}
        {isAuthenticated &&
          <>
            <Stack.Screen name="ChangePasswordPage" component={ChangePasswordPage} options={
              {
                headerShown: true, title: "Şifre değiştir", headerTintColor: colors.text,
                headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
              }
            } />
          </>}
      </Stack.Navigator>
    </>
  );
};

const AdminPanelStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="AdminPanelStackPages" component={AdminPanelStackPages} />
      <Stack.Screen name="AdminHotelsPage" component={AdminHotelsPage} options={
        {
          headerShown: true, title: "Oteller", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="AdminRoomsPage" component={AdminRoomsPage} options={
        {
          headerShown: true, title: "Odalar", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="UsersPage" component={UsersPage} options={
        {
          headerShown: true, title: "Kullanıcılar", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="ReservationsPage" component={ReservationsPage} options={
        {
          headerShown: true, title: "Rezervasyonlar", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="PaymentsPage" component={PaymentsPage} options={
        {
          headerShown: true, title: "Ödemeler", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="AddHotelPage" component={AddHotelPage} options={
        {
          headerShown: true, title: "Otel Ekle", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="AddRoomPage" component={AddRoomPage} options={
        {
          headerShown: true, title: "Oda Ekle", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="EditHotelPage" component={EditHotelPage} options={
        {
          headerShown: true, title: "Otel Bilgilerini Düzenle", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
      <Stack.Screen name="EditRoomPage" component={EditRoomPage} options={
        {
          headerShown: true, title: "Oda Bilgilerini Düzenle", headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.primary }, headerTitleAlign: "center"
        }
      } />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer >
        <Tab.Navigator initialRouteName="HomeStack"
          screenOptions={{ ...commonScreenOptions }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={
              {
                tabBarLabel: 'Ana Sayfa',
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons color={color} size={size}
                    name={focused ? 'home-circle' : 'home-outline'}
                  />
                ),
              }
            }

          />
          {authContext.isAuthenticated && <Tab.Screen
            name="ReservationStack"
            component={ReservationStack}
            options={({ route, navigation }) => {
              return {
                tabBarLabel: 'Rezervasyonlarım',
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons
                    color={color}
                    size={size}
                    name={focused ? 'calendar-check' : 'calendar-check-outline'}
                  />
                ),
                tabBarButton: props => (
                  <TouchableOpacity activeOpacity={1}
                    {...props}
                    onPress={() => navigation.navigate('ReservationStack', { screen: 'MyReservationsPage' })}
                  />
                ),
              };
            }}
          />
          }
          <Tab.Screen
            name="AccountStack"
            component={AccountStack}
            options={{
              tabBarLabel: 'Hesabım',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons color={color} size={size}
                  name={focused ? 'account-circle' : 'account-outline'}
                />
              ),
            }}
          />
          {authContext.isAuthenticated && authContext.user?.userType == "Admin" ?
            <Tab.Screen
              name="AdminPanelStack"
              component={AdminPanelStack}
              options={{
                tabBarLabel: 'Admin Paneli',
                tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons color={color} size={size}
                    name={focused ? 'shield-account' : 'shield-account-outline'}
                  />
                ),
              }}
            /> : <></>}
        </Tab.Navigator>
      </NavigationContainer>
    </View >
  );
};
const styles = StyleSheet.create({
  header: {
    ...baseStyles.bgColor,
  },
  tabHeaderText: {
    ...baseStyles.textColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
const commonScreenOptions = {
  headerShown: false,
  headerTitleStyle: styles.tabHeaderText,
  tabBarActiveBackgroundColor: baseStyles.bgColor.backgroundColor,
  tabBarActiveTintColor: baseStyles.textColor.color,
  tabBarInactiveBackgroundColor: baseStyles.bgColor.backgroundColor,
  tabBarInactiveTintColor: baseStyles.textColor.color,
  tabBarLabelStyle: {
    fontSize: 12,
    color: baseStyles.textColor.color,
  },
};
export default AppNavigator;
