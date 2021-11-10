import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { CreateCredorService } from "../services/CreateCredorService";

export class CreateCredorController {
    async handle(request: Request, response: Response) {
        const createCredorService = container.resolve(CreateCredorService);
        const { cpf, name } = request.body;
        if (!cpf || !name) {
            throw new AppError("Missing params on body!");
        }
        const credor = await createCredorService.execute({ cpf, name });
        return response.status(201).json(credor);
    }
}
