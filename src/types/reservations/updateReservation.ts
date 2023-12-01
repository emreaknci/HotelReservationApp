export default interface UpdateReservationDto {
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
    roomId?: number | null;
    customerId?: number | null;
}
