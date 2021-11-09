import { inject, injectable } from "tsyringe";

import { Payment } from "../entities/Payment";
import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";

@injectable()
export class ListPaymentsService {
    constructor(
        @inject("PaymentRepository")
        private paymentRepository: IPaymentRepository
    ) {}
    async execute(): Promise<Payment[]> {
        return this.paymentRepository.list();
    }
}
