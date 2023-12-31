import { AxiosResponse } from "axios";
import HotelDetailDto from "../types/hotels/hotelDetailDto";
import Result from "src/types/result";
import BaseService from './baseService';
import HotelDto from './../types/hotels/hotelDto';
import Hotel from "../types/hotels/hotel";
import HotelWithImageDto from './../types/hotels/hotelWithImageDto';


const HotelService = {
    getAllWithImages: (): Promise<AxiosResponse<Result<HotelDetailDto[]>>> => {
        return BaseService.get('/hotel/get-all-with-images');
    },
    getHotelsWithFirstImage: (hotelCount=0): Promise<AxiosResponse<Result<HotelWithImageDto[]>>> => {
        return BaseService.get(`/hotel/get-hotels-with-first-image?hotelCount=${hotelCount}`);
    },
    getByIdWithImages: (id: number): Promise<AxiosResponse<Result<HotelDetailDto>>> => {
        return BaseService.get(`/hotel/get-by-id-with-images/${id}`);
    },
    getByIdWithImagesAndRooms: (id: number): Promise<AxiosResponse<Result<HotelDetailDto>>> => {
        return BaseService.get(`/hotel/get-by-id-with-images-and-rooms/${id}`);
    },
    changeHotelStatus: async (hotelId: number): Promise<AxiosResponse<Result<boolean>>> => {
        return BaseService.get(`/hotel/change-hotel-status?hotelId=${hotelId}`);
    },
    getAllForDropdown: (): Promise<AxiosResponse<Result<HotelDto[]>>> => {
        return BaseService.get(`/hotel/get-all-for-dropdown`);
    },
    addHotel: async (formData: FormData): Promise<AxiosResponse<Result<Hotel>>> => {
        return BaseService.post(`/hotel`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    updateHotel: async (formData: FormData): Promise<AxiosResponse<Result<Hotel>>> => {
        return BaseService.put(`/hotel`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    removeById: async (id: number): Promise<AxiosResponse<Result<Hotel>>> => {
        return BaseService.delete(`/hotel/removeById/${id}`);
    },


}

export default HotelService;