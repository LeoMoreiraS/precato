import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEntesDevedoresService } from "../services/ListEntesDevedoresService";

export class ListEntesDevedoresController {
    async handle(request: Request, response: Response) {
        const listEntesDevedoresService = container.resolve(
            ListEntesDevedoresService
        );

        const entesDevedores = await listEntesDevedoresService.execute();
        return response.json(entesDevedores).status(201);
    }
}
