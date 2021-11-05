import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { UpdateCredorStatusService } from "../services/UpdateCredorStatusService";

export class UpdateCredorStatusController {
    async handle(request: Request, response: Response) {
        const updateCredorStatusService = container.resolve(
            UpdateCredorStatusService
        );
        const { approval } = request.body;
        const { cpf } = request.params;
        if (!cpf || approval === undefined) {
            throw new AppError("Missing params on body!");
        }
        const credor = await updateCredorStatusService.execute({
            cpf,
            approval,
        });
        return response.json(credor).status(200);
    }
}
