import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import ReservationCheckDto from './../types/reservations/reservationCheckDto';
import CreateReservationDto from './../types/reservations/createReservationDto';
import Reservation from './../types/reservations/reservation';


const ReservationService = {
    checkCustomerBookingAndRoomOccupancy: (dto:ReservationCheckDto): Promise<AxiosResponse<Result<string>>> => {
        return BaseService.post("/reservations/check-customer-booking-and-room-occupancy", dto);
    },
    createReservation:(dto:CreateReservationDto): Promise<AxiosResponse<Result<Reservation>>> => {
        return BaseService.post("/reservations", dto);
    }
}

export default ReservationService;