import { RoomType } from "src/enums/roomType";
import Hotel from "../hotels/hotel";

export default interface RoomDetailDto {
    id: number;
    createdDate: Date;
    updatedDate?: Date | null;
    status: boolean;
    isDeleted: boolean;
    type: RoomType;
    capacity?: number | null;
    price?: number | null;
    description?: string | null;
    name?: string | null;
    hotelId: number;
    hotel?: Hotel | null;
    images?: string[] | null;
}