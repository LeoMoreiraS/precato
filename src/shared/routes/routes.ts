import { Router } from "express";

import { credoresRoutes } from "./credores.routes";

const router = Router();

router.use("/credor", credoresRoutes);

export { router };
