
import axios from 'axios';
import Result from 'src/types/result';
const axiosInstance = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
    }
});

export default axiosInstance;