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
    getAllWithDetails: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-all-with-details");
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
    getMyUpcomingBookings: (): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        return BaseService.get("/reservations/get-current-user-upcoming-bookings");
    },
    cancelReservation: async (reservationId: number): Promise<AxiosResponse<Result<Reservation>>> => {
        return BaseService.get(`/reservations/cancel-reservation?reservationId=${reservationId}`);
    },
    getAllInDateRange: (startDate?, endDate?, status?): Promise<AxiosResponse<Result<ReservationListDto[]>>> => {
        const queryParams = { startDate: null, endDate: null, status: null, };

        if (startDate !== undefined && startDate !== null)
            queryParams.startDate = startDate;

        if (endDate !== undefined && endDate !== null)
            queryParams.endDate = endDate;

        if (status !== undefined && status !== null)
            queryParams.status = status;

        return BaseService.get('/reservations/get-all-in-date-range', { params: queryParams });
    },

}

export default ReservationService;
