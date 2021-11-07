import { Router } from "express";

import {
    CreateUserController,
    ListUsersController,
    UserLoginController,
} from "../../modules/user";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const userLoginController = new UserLoginController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/login", userLoginController.handle);

export { usersRoutes };
