import { Router } from "express";

import { CreateEnteDevedorController } from "../../modules/enteDevedor";

const entesDevedoresRoutes = Router();

const createEnteDevedorController = new CreateEnteDevedorController();

entesDevedoresRoutes.post("/", createEnteDevedorController.handle);

export { entesDevedoresRoutes };
