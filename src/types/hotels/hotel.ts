import BaseEntity from "../baseEntity";
import Room from "../rooms/room";

export default interface Hotel extends BaseEntity {
    name?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    star?: number | null;
    totalRoomCount?: number | null;
    rooms?: Room[] | null;
    reservations?: Reservation[] | null;
}

