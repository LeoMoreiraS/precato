import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEntesDevedoresService } from "../services/ListEntesDevedoresService";

export class ListEntesDevedoresController {
    async handle(request: Request, response: Response) {
        const listEntesDevedoresService = container.resolve(
            ListEntesDevedoresService
        );

        const entesDevedores = await listEntesDevedoresService.execute();
        if (entesDevedores.length !== 0) {
            return response.json(entesDevedores).status(200);
        }
        return response.json({}).status(204);
    }
}
