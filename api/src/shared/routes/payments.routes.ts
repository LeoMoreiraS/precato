import { Router } from "express";

import {
    CreatePaymentController,
    ListInvalidPaymentsController,
    ListPaymentsController,
    GenerateStatsController,
} from "../../modules/payment";
import { ensureLogin } from "../middleware/ensureLogin";

const paymentRoutes = Router();

const createPaymentController = new CreatePaymentController();
const listInvalidPaymentsController = new ListInvalidPaymentsController();
const listPaymentsController = new ListPaymentsController();
const generateStatsController = new GenerateStatsController();

paymentRoutes.post("/", createPaymentController.handle);
paymentRoutes.get("/", ensureLogin, listPaymentsController.handle);
paymentRoutes.get("/stats", ensureLogin, generateStatsController.handle);
paymentRoutes.get(
    "/invalid",
    ensureLogin,
    listInvalidPaymentsController.handle
);

export { paymentRoutes };
