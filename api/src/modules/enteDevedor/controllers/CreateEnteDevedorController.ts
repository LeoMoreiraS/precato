import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { CreateEnteDevedorService } from "../services/CreateEnteDevedorService";

export class CreateEnteDevedorController {
    async handle(request: Request, response: Response) {
        const createEnteDevedorService = container.resolve(
            CreateEnteDevedorService
        );
        const { cnpj, name } = request.body;
        if (!cnpj || !name) {
            throw new AppError("Missing params on body!");
        }
        const enteDevedor = await createEnteDevedorService.execute({
            cnpj,
            name,
        });
        return response.json(enteDevedor).status(201);
    }
}
