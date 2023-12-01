export default interface ChangeUserPasswordDto {
    id: number;
    oldPassword: string;
    newPassword: string;
}