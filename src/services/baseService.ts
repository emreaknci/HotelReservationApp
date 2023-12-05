
import axios from 'axios';
import storageService from './storageService';
const axiosInstance = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await storageService.getAsync("token");

        const bearerToken = token;

        config.headers.Authorization = `Bearer ${bearerToken}`;

        return config;
    },
    (error) => {
        console.log("InterceptorError: ", error)
        return Promise.reject(error);
    }
);

export default axiosInstance;