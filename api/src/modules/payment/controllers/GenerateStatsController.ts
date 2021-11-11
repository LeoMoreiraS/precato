import { Request, Response } from "express";
import { container } from "tsyringe";

import { GenerateStatsService } from "../services/GenerateStatsService";

export class GenerateStatsController {
    async handle(request: Request, response: Response) {
        const generateStatsService = container.resolve(GenerateStatsService);

        const stats = await generateStatsService.execute();

        return response.json(stats).status(200);
    }
}
