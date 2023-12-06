import Reservation from "../reservations/reservation";
import RoomDetailDto from "../rooms/roomDetailDto";


export default interface HotelDetailDto {
    id: number;
    createdDate: Date;
    updatedDate?: Date | null;
    status: boolean;
    isDeleted: boolean;
    name?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    description?: string | null;
    star?: number | null;
    totalRoomCount?: number | null;
    images: string[];
    rooms?: RoomDetailDto[] | null;
    reservations?: Reservation[] | null;
  }