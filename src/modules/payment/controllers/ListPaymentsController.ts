import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPaymentsService } from "../services/ListPaymentsService";

export class ListPaymentsController {
    async handle(request: Request, response: Response) {
        const listPaymentsService = container.resolve(ListPaymentsService);

        const payments = await listPaymentsService.execute();
        return response.json(payments).status(200);
    }
}
