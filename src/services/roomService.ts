import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import RoomDetailDto from "src/types/rooms/roomDetailDto";


const RoomService = {
    getAllWithImages:  (): Promise<AxiosResponse<Result<RoomDetailDto[]>>> => {
        return BaseService.get('/room/get-all-with-images');
    }
}

export default RoomService;