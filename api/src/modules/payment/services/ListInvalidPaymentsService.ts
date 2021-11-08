import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { Payment } from "../entities/Payment";
import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";

@injectable()
export class ListInvalidPaymentsService {
    constructor(
        @inject("PaymentRepository")
        private paymentRepository: IPaymentRepository
    ) {}
    async execute(): Promise<Payment[]> {
        const payments = await this.paymentRepository.listInvalid();
        if (payments.length === 0) throw new AppError("No payment was found!");
        return payments;
    }
}
