import { Router } from "express";

import { credoresRoutes } from "./credores.routes";
import { entesDevedoresRoutes } from "./entesdevedores.routes";

const router = Router();

router.use("/credor", credoresRoutes);
router.use("/entedevedor", entesDevedoresRoutes);
export { router };
