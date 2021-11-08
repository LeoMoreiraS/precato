import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePaymentService } from "../services/CreatePaymentService";

interface IRequestPaymentDTO {
    credor_id;
    ente_devedor_id;
    start_value;
    end_value;
    date;
    delivery_id;
}
export class CreatePaymentController {
    async handle(request: Request, response: Response) {
        const createPaymentService = container.resolve(CreatePaymentService);
        const {
            credor_id,
            ente_devedor_id,
            start_value,
            end_value,
            date,
            delivery_id,
        }: IRequestPaymentDTO = request.body;
        const payment = await createPaymentService.execute({
            credor_id,
            ente_devedor_id,
            start_value,
            end_value,
            date,
            delivery_id,
        });
        return response.json(payment).status(201);
    }
}
