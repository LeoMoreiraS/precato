import { Router } from "express";

import {
    CreateCredorController,
    UpdateCredorStatusController,
} from "../../modules/credor";

const credoresRoutes = Router();

const createCredorController = new CreateCredorController();
const updateCredorStatusController = new UpdateCredorStatusController();

credoresRoutes.post("/", createCredorController.handle);
credoresRoutes.patch("/:cpf", updateCredorStatusController.handle);
export { credoresRoutes };
