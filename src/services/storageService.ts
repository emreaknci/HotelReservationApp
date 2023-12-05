import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {

    getAsync: async (key: string) => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    setAsync: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    removeAsync: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },

    clearAsync: async () => {
        AsyncStorage.clear();
    },

    clearUserInfoAndToken: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userFullName');
        await AsyncStorage.removeItem('userType');
        await AsyncStorage.removeItem('tokenExpiration');
    },
};

export default StorageService;