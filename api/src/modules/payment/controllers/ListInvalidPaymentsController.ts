import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListInvalidPaymentsService } from "../services/ListInvalidPaymentsService";

export class ListInvalidPaymentsController {
    async handle(request: Request, response: Response) {
        const listInvalidPaymentsService = container.resolve(
            ListInvalidPaymentsService
        );

        const payments = await listInvalidPaymentsService.execute();
        if (payments.length !== 0) {
            return response.json(payments).status(200);
        }
        return response.json({}).status(204);
    }
}
