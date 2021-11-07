import { Router } from "express";

import { CreateUserController } from "../../modules/user";
import {} from "../../modules/credor/controllers/ListCredoresController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
