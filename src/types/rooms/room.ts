import { RoomType } from "../../enums/roomType";
import BaseEntity from "../baseEntity";
import Hotel from "../hotels/hotel";

export default interface Room extends BaseEntity {
    type: RoomType;
    capacity?: number | null;
    price?: number | null;
    description?: string | null;
    imageUrl?: string | null;
    name?: string | null;
    hotelId: number;
    hotel?: Hotel | null;
}