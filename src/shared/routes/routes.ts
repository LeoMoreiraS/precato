import { Router } from "express";

import { credoresRoutes } from "./credores.routes";
import { entesDevedoresRoutes } from "./entesdevedores.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/credor", credoresRoutes);
router.use("/user", usersRoutes);
router.use("/entedevedor", entesDevedoresRoutes);
export { router };
