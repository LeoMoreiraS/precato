import { Router } from "express";

import { credoresRoutes } from "./credores.routes";
import { entesDevedoresRoutes } from "./entesdevedores.routes";
import { paymentRoutes } from "./payments.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/credor", credoresRoutes);
router.use("/user", usersRoutes);
router.use("/entedevedor", entesDevedoresRoutes);
router.use("/payment", paymentRoutes);

export { router };
