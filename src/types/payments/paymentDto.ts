import Payment from "./payment";

export default interface PaymentDto {
    payments?: Payment[];
    totalAmount?: number;
    totalPaymentCount?: number;
    totalPaidCount?: number;
    totalCanceledCount?: number;
}

