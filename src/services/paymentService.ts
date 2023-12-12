import { AxiosResponse } from "axios";
import Result from "src/types/result";
import BaseService from './baseService';
import PaymentDto from './../types/payments/paymentDto';

const PaymentService = {
    getAllInDateRange: (startDate, endDate, status?): Promise<AxiosResponse<Result<PaymentDto>>> => {
        return BaseService.get(`/Payment/get-all-in-date-range?startDate=${startDate}&endDate=${endDate}${status !== null ? `&status=${status}` : ''}`);
    },
}

export default PaymentService;
