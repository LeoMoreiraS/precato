import { Router } from "express";

import { CreateEnteDevedorController } from "../../modules/enteDevedor";
import { ListEntesDevedoresController } from "../../modules/enteDevedor/controllers/ListEntesDevedoresController";

const entesDevedoresRoutes = Router();

const createEnteDevedorController = new CreateEnteDevedorController();
const listEntesDevedoresController = new ListEntesDevedoresController();

entesDevedoresRoutes.post("/", createEnteDevedorController.handle);
entesDevedoresRoutes.get("/", listEntesDevedoresController.handle);

export { entesDevedoresRoutes };
