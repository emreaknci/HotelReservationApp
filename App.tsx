import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
import colors from './colors';
import { AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();
export default function App() {
  return (

    <AuthProvider>
      <ToastProvider renderType={{
        custom_type: (toast) => (
          <View style={[toasterStyles.style, toast.style]}>
            {toast.data?.title && <Text style={{ fontWeight: 'bold', color: toast.data.color ?? colors.primary }}>{toast.data.title}</Text>}
            <Text style={{ color: toast.data.color ?? colors.primary, fontWeight: toast.data.title ? "normal" : "bold" }}>{toast.message}</Text>
          </View>
        )
      }}>
        <AppNavigator />
      </ToastProvider >
    </AuthProvider>

  );
}

const toasterStyles = StyleSheet.create({
  style: {
    borderRadius: 5,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderColor: colors.secondary,
    backgroundColor: colors.background,
    width: "80%",
  }
});



