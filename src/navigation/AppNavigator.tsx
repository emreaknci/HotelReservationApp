import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import colors from '../../colors';
import baseStyles from "../../styles"
import AdminPanelStackPages from '../pages/AdminPanelStackPages';
import ReservationStackPages from '../pages/ReservationStackPages';
import LoginPage from '../pages/AccountStackPages/LoginPage';
import RegisterPage from '../pages/AccountStackPages/RegisterPage';
import MyAccountPage from '../pages/AccountStackPages/MyAccountPage';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import HomeStackPages from '../pages/HomeStackPages';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HeaderTitle = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>TRIVAGO</Text>
  </View>
);
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen
        name="HomeStackPages"
        component={HomeStackPages}
      />
    </Stack.Navigator>
  );
};

const ReservationStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen
        name="ReservationStackPages"
        component={ReservationStackPages}
      />
    </Stack.Navigator>
  )
}

const AccountStack = () => {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen
        name={isAuthenticated ? "MyAccountPage" : "LoginPage"}
        component={isAuthenticated ? MyAccountPage : LoginPage} />
      {!isAuthenticated && <Stack.Screen name="RegisterPage" component={RegisterPage} />}

    </Stack.Navigator>
  );
};

const AdminPanelStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="AdminPanelStackPages" component={AdminPanelStackPages}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
  }, [authContext.isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HeaderTitle />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HomeStack"
          screenOptions={{ ...commonScreenOptions }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={
              {
                freezeOnBlur: true,
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
            options={{
              tabBarLabel: 'Rezervasyonlarım',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons color={color} size={size}
                  name={focused ? 'calendar-check' : 'calendar-check-outline'}
                />
              ),
            }}

          />}
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

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.bgColor.backgroundColor,
    paddingTop: 25,
    paddingBottom: 10,
  },
  headerText: {
    ...baseStyles.textColor,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
    color: colors.text,
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
