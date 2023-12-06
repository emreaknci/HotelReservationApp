import { AxiosResponse } from "axios";
import HotelDetailDto from "src/types/hotels/hotelDetailDto";
import Result from "src/types/result";
import BaseService from './baseService';


const HotelService = {
    getAllWithImages:  (): Promise<AxiosResponse<Result<HotelDetailDto[]>>> => {
        return BaseService.get('/hotel/get-all-with-images');
    }
}

export default HotelService;