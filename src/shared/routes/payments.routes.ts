import { Router } from "express";

import { CreatePaymentController } from "../../modules/payment";
import { ensureLogin } from "../middleware/ensureLogin";

const paymentRoutes = Router();

const createPaymentController = new CreatePaymentController();

paymentRoutes.post("/", createPaymentController.handle);

export { paymentRoutes };
