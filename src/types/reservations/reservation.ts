import AppUser from "../appUser";
import BaseEntity from "../baseEntity";
import Hotel from "../hotels/hotel";
import Room from "../rooms/room";

interface Reservation extends BaseEntity {
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
    hotelId: number;
    hotel?: Hotel | null;
    roomId: number;
    room?: Room | null;
    customerId: number;
    customer?: AppUser | null;
    paymentId?: number | null;
    payment?: Payment | null;
}
