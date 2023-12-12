import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import RoomDetailDto from "src/types/rooms/roomDetailDto";
import Room from './../types/rooms/room';
import CreateRoomDto from './../types/rooms/createRoomDto';

const RoomService = {
    getRoomByIdWithImages: (id: number): Promise<AxiosResponse<Result<RoomDetailDto>>> => {
        return BaseService.get(`/room/get-room-by-id-with-images/${id}`);
    },
    getRoomsWithImages: (): Promise<AxiosResponse<Result<RoomDetailDto[]>>> => {
        return BaseService.get(`/room/get-rooms-with-images`);
    },
    changeRoomStatus: async (roomId: number): Promise<AxiosResponse<Result<boolean>>> => {
        return BaseService.get(`/room/change-room-status?roomId=${roomId}`);
    },
    addRoom: async (formData:FormData): Promise<AxiosResponse<Result<Room>>> => {
        return BaseService.post(`/room`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    updateRoom: async (formData: FormData): Promise<AxiosResponse<Result<Room>>> => {
        return BaseService.put(`/room`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    removeById: async (id: number): Promise<AxiosResponse<Result<Room>>> => {
        return BaseService.delete(`/room/removeById/${id}`);
    }
}

export default RoomService;