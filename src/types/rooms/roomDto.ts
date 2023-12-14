export default interface RoomDto {
    id?: number;
    status?: boolean | null;
    isDeleted?: boolean | null;
    capacity?: number | null;
    price?: number | null;
    name?: string | null;
    hotelId?: number;
    hotelName?: string;
    imagePath?: string | null;
}