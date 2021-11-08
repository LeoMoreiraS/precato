import { ICreatePaymentDTO } from "../../DTOs/ICreatePaymentDTO";
import { Payment } from "../../entities/Payment";

export interface IPaymentRepository {
    create({
        credor_id,
        ente_devedor_id,
        date,
        start_value,
        end_value,
    }: ICreatePaymentDTO): Promise<Payment>;
    findByDelivery(delivery_id: string): Promise<Payment[]>;
    list(): Promise<Payment[]>;
    listInvalid(): Promise<Payment[]>;
}
