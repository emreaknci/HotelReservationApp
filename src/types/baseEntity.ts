export default interface BaseEntity {
    id: number;
    createdDate: Date;
    updatedDate?: Date | null;
    status: boolean;
    isDeleted: boolean;
}