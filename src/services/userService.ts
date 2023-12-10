import { AxiosResponse } from "axios";
import Result from "src/types/result";
import ChangeUserPasswordDto from "src/types/users/changeUserPasswordDto";
import BaseService from './baseService';
import AppUser from './../types/appUser';

const UserService = {
    changePassword: async (dto: ChangeUserPasswordDto): Promise<AxiosResponse<Result<boolean>>> => {
        return await BaseService.post('/user/change-password', dto);
    },
    getAll: (): Promise<AxiosResponse<Result<AppUser[]>>> => {
        return BaseService.get('/user/get-all',);
    },
    changeUserType: async (userId:number): Promise<AxiosResponse<Result<boolean>>> => {
        return await BaseService.get(`/user/change-user-type?userId=${userId}`);
    },
    changeAccountStatus: async (userId:number): Promise<AxiosResponse<Result<boolean>>> => {
        return await BaseService.get(`/user/change-account-status?userId=${userId}`);
    },
}

export default UserService;
