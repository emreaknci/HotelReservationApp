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
    }
};

export default StorageService;