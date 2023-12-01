export default interface CreatePaymentDto {
    amount: number;
    paymentDate?: Date | null;
    cvv?: string | null;
    cardNumber?: string | null;
    cardHolderName?: string | null;
    expirationDate?: Date | null;
    isCardValid: () => boolean;
}

// function isCardValid(paymentDto: CreatePaymentDto): boolean {
//     if (!paymentDto.cvv || paymentDto.cvv.length !== 3 || !paymentDto.cvv.split('').every(char => char >= '0' && char <= '9')) {
//         return false;
//     }

//     if (!paymentDto.cardNumber || paymentDto.cardNumber.length !== 16 || !paymentDto.cardNumber.split('').every(char => char >= '0' && char <= '9')) {
//         return false;
//     }

//     if (!paymentDto.cardHolderName || /\d/.test(paymentDto.cardHolderName)) {
//         return false;
//     }

//     if (!paymentDto.expirationDate || new Date(paymentDto.expirationDate) <= new Date()) {
//         return false;
//     }

//     return true;
// }

