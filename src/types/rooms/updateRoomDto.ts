import { RoomType } from "../../enums/roomType";

export default interface UpdateRoomDto {
    id?: number | null;
    type?: RoomType | null;
    capacity?: number | null;
    price?: number | null;
    description?: string | null;
    name?: string | null;
    hotelId?: number | null;
    newImages?: Blob[] | null;
    imagePathsToDelete?: string[] | null;
}