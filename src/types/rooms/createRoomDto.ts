import { RoomType } from "../../enums/roomType";

export default interface CreateRoomDto {
    type?: RoomType | null;
    capacity?: number | null;
    price?: number | null;
    description?: string | null;
    imageUrl?: string | null;
    name?: string | null;
    hotelId?: number | null;
}