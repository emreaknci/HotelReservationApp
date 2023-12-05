export default interface LoginResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    expiration: Date;
    userType: string; // "Admin" or "Customer"
}
