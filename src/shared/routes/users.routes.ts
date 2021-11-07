import { Router } from "express";

import { CreateUserController, ListUsersController } from "../../modules/user";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };
