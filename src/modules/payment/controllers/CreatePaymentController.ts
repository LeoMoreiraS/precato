import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequestPaymentDTO } from "../DTOs/IRequestPaymentDTO";
import { CreatePaymentService } from "../services/CreatePaymentService";

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
