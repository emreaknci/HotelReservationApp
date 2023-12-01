import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../pages/HomePage';
import ReservationPage from '../pages/ReservationPage';
import AccountPage from '../pages/AccountPage';
import AdminPanelPage from '../pages/AdminPanelPage';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import baseStyles from "../../styles"


const Tab = createBottomTabNavigator();

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
    backgroundColor: 'red',
    padding: 10,
  },
  headerText: {
    ...baseStyles.textColor,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 16
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
  }
};
const HeaderTitle = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>TRIVAGO</Text>
  </View>
);
const AppNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HeaderTitle />

      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen
            name="HomePage" component={HomePage}
            options={{
              ...commonScreenOptions, tabBarLabel: 'Ana Sayfa',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons name={focused ? 'home-circle' : 'home-outline'}
                  color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="ReservationPage" component={ReservationPage}
            options={{
              ...commonScreenOptions, tabBarLabel: 'Rezervasyonlarım',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons
                  name={focused ? 'calendar-check' : 'calendar-check-outline'}
                  color={color} size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AccountPage" component={AccountPage}
            options={{
              ...commonScreenOptions, tabBarLabel: 'Hesabım',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-outline'}
                  color={color} size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AdminPanelPage" component={AdminPanelPage}
            options={{
              ...commonScreenOptions, tabBarLabel: 'Admin Paneli',
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons
                  name={focused ? 'shield-account' : 'shield-account-outline'}
                  color={color} size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
