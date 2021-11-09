import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCredoresService } from "../services/ListCredoresService";

export class ListCredoresController {
    async handle(request: Request, response: Response) {
        const listCredoresService = container.resolve(ListCredoresService);

        const credores = await listCredoresService.execute();

        if (credores.length !== 0) {
            return response.json(credores).status(200);
        }

        return response.json({}).status(204);
    }
}
