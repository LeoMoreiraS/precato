import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersService } from "../services/ListUsersService";

export class ListUsersController {
    async handle(request: Request, response: Response) {
        const listUsersService = container.resolve(ListUsersService);

        const users = await listUsersService.execute();
        if (users.length !== 0) {
            return response.json(users).status(200);
        }
        return response.json({}).status(204);
    }
}
