export default interface UpdateHotelDto {
    id: number;
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
    newImages?: Blob[] | null;
    imagePathsToDelete?: string[] | null;
}
