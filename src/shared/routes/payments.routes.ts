import { Router } from "express";

import {
    CreatePaymentController,
    ListInvalidPaymentsController,
    ListPaymentsController,
} from "../../modules/payment";
import { ensureLogin } from "../middleware/ensureLogin";

const paymentRoutes = Router();

const createPaymentController = new CreatePaymentController();
const listInvalidPaymentsController = new ListInvalidPaymentsController();
const listPaymentsController = new ListPaymentsController();

paymentRoutes.post("/", createPaymentController.handle);
paymentRoutes.get("/", ensureLogin, listPaymentsController.handle);
paymentRoutes.get(
    "/invalid",
    ensureLogin,
    listInvalidPaymentsController.handle
);
export { paymentRoutes };
