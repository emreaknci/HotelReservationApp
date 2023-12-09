import CreatePaymentDto from "../payments/createPaymentDto";

export default interface CreateReservationDto {
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
    hotelId?: number;
    roomId?: number;
    customerId?: number;
    paymentDto?: CreatePaymentDto;
}