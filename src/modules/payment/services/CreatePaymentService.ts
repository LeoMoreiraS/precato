import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { ICredorRepository } from "../../credor";
import { IEnteDevedorRepository } from "../../enteDevedor";
import { Payment } from "../entities/Payment";
import { IPaymentRepository } from "../repositories/interfaces/IPaymentRepository";

interface IRequestPaymentDTO {
    delivery_id: string;
    credor_id: string;
    ente_devedor_id?: string;
    start_value: number;
    end_value: number;
    date: Date;
}
@injectable()
export class CreatePaymentService {
    constructor(
        @inject("PaymentRepository")
        private paymentRepository: IPaymentRepository,
        @inject("CredorRepository")
        private credorRepository: ICredorRepository,
        @inject("EnteDevedorRepository")
        private enteDevedorRepository: IEnteDevedorRepository
    ) {}
    async execute({
        credor_id,
        ente_devedor_id,
        start_value,
        end_value,
        date,
        delivery_id,
    }: IRequestPaymentDTO): Promise<Payment> {
        let status: string;
        let reason: string;
        let ente_id: string;
        try {
            const enteDevedor = await this.enteDevedorRepository.find(
                ente_devedor_id
            );
            if (!enteDevedor) {
                status = "Invalid";
                ente_id = null;
                reason = "Ente devedor does not exists.";
                throw new AppError("Ente devedor does not exists.");
            }
            ente_id = ente_devedor_id;
            const credor = await this.credorRepository.find(credor_id);
            if (credor.status !== "Approved") {
                status = "Invalid";
                reason = "Credor status is not approved.";
                throw new AppError("Credor status is not approved.");
            }

            if (start_value <= 0 || end_value <= 0) {
                status = "Invalid";
                reason = "Start value or end value less equal than zero.";
                throw new AppError(
                    "Start value or end value less equal than zero."
                );
            }
            if (start_value < end_value) {
                status = "Invalid";
                reason = "End value is bigger than start value.";
                throw new AppError("End value is bigger than start value.");
            }
            const paymentAlreadyExists =
                await this.paymentRepository.findByDelivery(delivery_id);
            const credorWithSamePayment = paymentAlreadyExists.find(
                (payment) => payment.credor_id === credor_id
            );
            if (credorWithSamePayment) {
                status = "Invalid";
                reason =
                    "Another payment with same delivery id and credor already exists.";
                throw new AppError(
                    "Another payment with same delivery id and credor already exists."
                );
            }
            status = "Valid";

            const payment = await this.paymentRepository.create({
                delivery_id,
                credor_id,
                ente_devedor_id: ente_id,
                start_value,
                end_value,
                date,
                status,
            });
            return payment;
        } catch (error) {
            console.log(status);
            const payment = await this.paymentRepository.create({
                delivery_id,
                credor_id,
                ente_devedor_id: ente_id,
                start_value,
                end_value,
                date,
                status,
                reason,
            });
            return payment;
        }
    }
}