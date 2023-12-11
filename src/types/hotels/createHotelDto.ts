export default interface CreateHotelDto {
    name?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    description?: string | null;
    images?: Blob[] | null;
    star?: number | null;
    totalRoomCount?: number | null;
}
