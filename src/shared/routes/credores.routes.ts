import { Router } from "express";

import {
    CreateCredorController,
    UpdateCredorStatusController,
    ListCredoresController,
} from "../../modules/credor";
import {} from "../../modules/credor/controllers/ListCredoresController";

const credoresRoutes = Router();

const createCredorController = new CreateCredorController();
const updateCredorStatusController = new UpdateCredorStatusController();
const listCredoresController = new ListCredoresController();

credoresRoutes.post("/", createCredorController.handle);
credoresRoutes.patch("/:cpf", updateCredorStatusController.handle);
credoresRoutes.get("/", listCredoresController.handle);
export { credoresRoutes };
