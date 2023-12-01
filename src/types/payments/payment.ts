import { PaymentStatus } from "../../enums/paymentStatus";
import BaseEntity from "../baseEntity";

export default interface Payment extends BaseEntity {
    amount: number;
    paymentDate: Date;
    paymentStatus: PaymentStatus;
}