import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListInvalidPaymentsService } from "../services/ListInvalidPaymentsService";

export class ListInvalidPaymentsController {
    async handle(request: Request, response: Response) {
        const listInvalidPaymentsService = container.resolve(
            ListInvalidPaymentsService
        );

        const payments = await listInvalidPaymentsService.execute();
        return response.json(payments).status(200);
    }
}
