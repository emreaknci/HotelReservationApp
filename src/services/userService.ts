import { AxiosResponse } from "axios";
import Result from "src/types/result";
import ChangeUserPasswordDto from "src/types/users/changeUserPasswordDto";
import BaseService from './baseService';

const UserService = {
    changePassword: async (dto: ChangeUserPasswordDto): Promise<AxiosResponse<Result<boolean>>> => {
        return await BaseService.post('/user/change-password', dto);
    }
}

export default UserService;
