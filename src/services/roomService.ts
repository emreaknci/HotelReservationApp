import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import RoomDetailDto from "src/types/rooms/roomDetailDto";


const RoomService = {
    getRoomByIdWithImages:  (id:number): Promise<AxiosResponse<Result<RoomDetailDto>>> => {
        return BaseService.get(`/room/get-room-by-id-with-images/${id}`);
    }
}

export default RoomService;