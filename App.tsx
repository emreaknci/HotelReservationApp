import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <AppNavigator />
    </>
  );
}



