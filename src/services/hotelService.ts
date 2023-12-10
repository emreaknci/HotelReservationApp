import { AxiosResponse } from "axios";
import HotelDetailDto from "src/types/hotels/hotelDetailDto";
import Result from "src/types/result";
import BaseService from './baseService';


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
}

export default HotelService;