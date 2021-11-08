import { getRepository, Repository } from "typeorm";

import { ICreatePaymentDTO } from "../../DTOs/ICreatePaymentDTO";
import { Payment } from "../../entities/Payment";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";

export class PaymentRepository implements IPaymentRepository {
    private ormRepository: Repository<Payment>;
    constructor() {
        this.ormRepository = getRepository(Payment);
    }
    async findByDelivery(delivery_id: string): Promise<Payment[]> {
        const payment = await this.ormRepository.find({ delivery_id });
        return payment;
    }
    async listInvalid(): Promise<Payment[]> {
        const payments = await this.ormRepository.find({ status: "Invalid" });
        return payments;
    }
    async list(): Promise<Payment[]> {
        const payments = await this.ormRepository.find();
        return payments;
    }
    async create({
        delivery_id,
        start_value,
        end_value,
        credor_id,
        ente_devedor_id,
        date,
        status,
        reason,
    }: ICreatePaymentDTO): Promise<Payment> {
        const payment = this.ormRepository.create();
        Object.assign(payment, {
            delivery_id,
            start_value,
            end_value,
            credor_id,
            ente_devedor_id,
            date,
            status,
            reason,
        });
        await this.ormRepository.save(payment);
        return payment;
    }
}
