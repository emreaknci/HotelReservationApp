import RegisterDto from '../types/users/registerDto';
import AppUser from '../types/appUser';
import Result from '../types/result';
import BaseService from './baseService';
import AccessToken from 'src/types/accessToken';
import { AxiosResponse } from 'axios';
import LoginResponse from 'src/types/loginResponse';


const AuthService = {
    registerForCustomer: async (dto: RegisterDto): Promise<AxiosResponse<Result<RegisterDto>>> => {
        return await BaseService.post('/auth/customer-register', dto);
    },
    login: async (dto: any): Promise<AxiosResponse<Result<LoginResponse>>> => {
        return await BaseService.post('/auth/login', dto);
    }
};

export default AuthService;