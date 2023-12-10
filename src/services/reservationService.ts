import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import ReservationCheckDto from './../types/reservations/reservationCheckDto';
import CreateReservationDto from './../types/reservations/createReservationDto';
import Reservation from './../types/reservations/reservation';
import ReservationListDto from './../types/reservations/reservationListDto';


const ReservationService = {
    checkCustomerBookingAndRoomOccupancy: (dto: ReservationCheckDto): Promise<AxiosResponse<Result<string>>> => {
        return BaseService.post("/reservations/check-customer-booking-and-room-occupancy", dto);
    },
    createReservation: (dto: CreateReservationDto): Promise<AxiosResponse<Result<Reservation>>> => {
        return BaseService.post("/reservations", dto);
    },
    getMyAllReservations: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-current-user-reservations");
    },
    getMyPastReservations: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-current-user-past-reservations");
    },
    getMyActiveReservations: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-current-user-active-reservations");
    },
    getMyCanceledReservations: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-current-user-canceled-reservations");
    },
    cancelReservation: async (reservationId: number): Promise<AxiosResponse<Result<Reservation>>> => {
        return BaseService.get(`/reservations/cancel-reservation?reservationId=${reservationId}`);
    },

}

export default ReservationService;
