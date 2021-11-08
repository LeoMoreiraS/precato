import { Router } from "express";

import {
    CreateEnteDevedorController,
    ListEntesDevedoresController,
} from "../../modules/enteDevedor";

const entesDevedoresRoutes = Router();

const createEnteDevedorController = new CreateEnteDevedorController();
const listEntesDevedoresController = new ListEntesDevedoresController();

entesDevedoresRoutes.post("/", createEnteDevedorController.handle);
entesDevedoresRoutes.get("/", listEntesDevedoresController.handle);

export { entesDevedoresRoutes };
