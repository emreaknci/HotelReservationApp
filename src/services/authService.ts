import RegisterDto from '../types/users/registerDto';
import AppUser from '../types/appUser';
import Result from '../types/result';
import BaseService from './baseService';


const AuthService = {
    registerForCustomer: async (dto: RegisterDto): Promise<Result<AppUser>> => {
        try {
            const response: Result<AppUser> = await BaseService.axiosInstance.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/customer-register`, dto);
            return BaseService.handleResponse(response);
        } catch (error: any) {
            return BaseService.handleErrorResponse(error);
        }
    },
};

export default AuthService;