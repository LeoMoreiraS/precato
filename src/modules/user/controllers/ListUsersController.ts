import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersService } from "../services/ListUsersService";

export class ListUsersController {
    async handle(request: Request, response: Response) {
        const listUsersService = container.resolve(ListUsersService);

        const users = await listUsersService.execute();
        return response.json(users).status(200);
    }
}
