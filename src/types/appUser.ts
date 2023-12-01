import { UserType } from "../enums/userType";
import BaseEntity from "./baseEntity";

export default interface AppUser extends BaseEntity {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    passwordHash?: Uint8Array | null;
    passwordSalt?: Uint8Array | null;
    resetPasswordToken?: string | null;
    userType: UserType;
}




