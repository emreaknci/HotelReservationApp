import { AxiosResponse } from "axios";
import HotelDetailDto from "../types/hotels/hotelDetailDto";
import Result from "src/types/result";
import BaseService from './baseService';
import HotelDto from './../types/hotels/hotelDto';
import Hotel from "../types/hotels/hotel";


const HotelService = {
    getAllWithImages: (): Promise<AxiosResponse<Result<HotelDetailDto[]>>> => {
        return BaseService.get('/hotel/get-all-with-images');
    },

    getByIdWithImages: (id: number): Promise<AxiosResponse<Result<HotelDetailDto>>> => {
        return BaseService.get(`/hotel/get-by-id-with-images/${id}`);
    },
    changeHotelStatus: async (hotelId: number): Promise<AxiosResponse<Result<boolean>>> => {
        return BaseService.get(`/hotel/change-hotel-status?hotelId=${hotelId}`);
    },
    getAllForDropdown: (): Promise<AxiosResponse<Result<HotelDto[]>>> => {
        return BaseService.get(`/hotel/get-all-for-dropdown`);
    },
    addRoom: async (formData: FormData): Promise<AxiosResponse<Result<Hotel>>> => {
        console.log("gelen formdata", formData);
        return BaseService.post(`/hotel`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    removeById: async (id: number): Promise<AxiosResponse<Result<Hotel>>> => {
        return BaseService.delete(`/hotel/removeById/${id}`);
    }
}

export default HotelService;