export default interface ReservationListDto {
    id?: number | null;
    hotelId?: number | null;
    hotelName?: string | null;
    roomId?: number | null;
    roomName?: string | null;
    roomType?: number | null;
    paymentId?: number | null;
    amount?: number | null;
    paymentStatus?: string | null;
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
}
