
import axios from 'axios';
import Result from 'src/types/result';
const BaseService = {
    axiosInstance: axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    }),
    handleResponse: (response: Result<any>): Result<any> => {
        console.log("hanled", response)
        return { data: response.data, success: true, message: response.message };
    },
    handleErrorResponse: (error: any): Result<null> => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    success: false,
                    message: `${error.response.data.message}`,
                };
            } else if (error.request) {
                return {
                    success: false,
                    message: "No response received",
                };
            } else {
                console.log("Error message:", error.message);
                return {
                    success: false,
                    message: `Error message: ${error.message}`,
                };
            }
        } else {
            console.log("Non-Axios error:", error);
            return {
                success: false,
                message: `Non-Axios error: ${error}`,
            };
        }
    }
}
export default BaseService;
