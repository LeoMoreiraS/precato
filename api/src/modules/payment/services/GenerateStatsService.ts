import { inject, injectable } from "tsyringe";

import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";

interface IStats {
    num_payments: number;
    invalid_payments: number;
    valid_payments: number;
    revenue: number;
}

@injectable()
export class GenerateStatsService {
    constructor(
        @inject("PaymentRepository")
        private paymentRepository: IPaymentRepository
    ) {}
    async execute(): Promise<IStats> {
        const payments = await this.paymentRepository.list();
        let soma = 0;
        let invalid = 0;
        payments.forEach((payment) => {
            if (payment.status === "Valid") {
                soma += payment.start_value - payment.end_value;
            } else {
                invalid += 1;
            }
        });
        const revenue = soma;
        console.log(revenue);
        const stats: IStats = {
            revenue,
            num_payments: payments.length,
            invalid_payments: invalid,
            valid_payments: payments.length - invalid,
        };
        return stats;
    }
}
