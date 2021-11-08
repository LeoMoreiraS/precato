import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const createUserService = container.resolve(CreateUserService);
        const { password, email, name } = request.body;
        if (!password || !name || !email) {
            throw new AppError("Missing params on body!");
        }
        const credor = await createUserService.execute({
            email,
            name,
            password,
        });
        return response.json(credor).status(201);
    }
}
