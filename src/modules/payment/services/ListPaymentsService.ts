import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { Payment } from "../entities/Payment";
import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";

@injectable()
export class ListPaymentsService {
    constructor(
        @inject("PaymentRepository")
        private paymentRepository: IPaymentRepository
    ) {}
    async execute(): Promise<Payment[]> {
        const payments = await this.paymentRepository.list();
        if (payments.length === 0) throw new AppError("No payment was found!");
        return payments;
    }
}
