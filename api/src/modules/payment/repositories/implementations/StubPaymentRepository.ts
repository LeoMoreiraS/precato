import { injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import {
    IRequestPaymentDTO,
    IPaymentRepository,
    Payment,
    ICreatePaymentDTO,
} from "../..";
import { Credor } from "../../../credor/entities/Credor";
import { EnteDevedor } from "../../../enteDevedor";

const date = new Date();
const valid_credor = new Credor();
valid_credor.status = "Approved";
const valid_ente_devedor = new EnteDevedor();
const valid_delivery_id = uuid();
const valid_input: IRequestPaymentDTO = {
    credor_id: valid_credor.id,
    ente_devedor_id: valid_ente_devedor.id,
    date,
    delivery_id: valid_delivery_id,
    start_value: 2000.4,
    end_value: 1000.4,
};

@injectable()
export class StubPaymentRepository implements IPaymentRepository {
    async findByDelivery(delivery_id: string): Promise<Payment[]> {
        const payments: Payment[] = [];
        const payment1 = {
            credor_id: "123",
            delivery_id,
            date,
            end_value: valid_input.end_value,
            start_value: valid_input.start_value,
            ente_devedor_id: valid_input.ente_devedor_id,
            status: "Valid",
            reason: null,
            credor: valid_credor,
            enteDevedor: valid_ente_devedor,
            created_at: date,
            updated_at: date,
        };
        payments.push(payment1);
        if (delivery_id === valid_delivery_id) return payments;
        const payment = {
            credor_id: valid_input.credor_id,
            delivery_id,
            date,
            end_value: valid_input.end_value,
            start_value: valid_input.start_value,
            ente_devedor_id: valid_input.ente_devedor_id,
            status: "Valid",
            reason: null,
            credor: valid_credor,
            enteDevedor: valid_ente_devedor,
            created_at: date,
            updated_at: date,
        };
        payments.push(payment);
        return payments;
    }
    listInvalid(): Promise<Payment[]> {
        throw new Error("Method not implemented.");
    }

    list(): Promise<Payment[]> {
        throw new Error("Method not implemented.");
    }
    async create({
        credor_id,
        delivery_id,
        date,
        end_value,
        start_value,
        ente_devedor_id,
        status,
        reason,
    }: ICreatePaymentDTO): Promise<Payment> {
        const payment: Payment = await {
            credor_id,
            delivery_id,
            date,
            end_value,
            start_value,
            ente_devedor_id,
            status,
            reason,
            credor: valid_credor,
            enteDevedor: valid_ente_devedor,
            created_at: date,
            updated_at: date,
        };
        return payment;
    }
}

export { valid_credor, valid_ente_devedor, valid_input };
