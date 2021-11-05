import { Router } from "express";

import { CreateCredorController } from "../../modules/credor";

const credoresRoutes = Router();

const createCredorController = new CreateCredorController();

credoresRoutes.post("/", createCredorController.handle);

export { credoresRoutes };
