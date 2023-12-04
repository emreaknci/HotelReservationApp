import RegisterDto from '../types/users/registerDto';
import AppUser from '../types/appUser';
import Result from '../types/result';
import BaseService from './baseService';


const AuthService = {
    registerForCustomer: async (dto: RegisterDto): Promise<any> => {
        return await BaseService.post('/auth/customer-register', dto);
    },
};

export default AuthService;