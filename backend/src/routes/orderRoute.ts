import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { fixHandler } from "../../utils/fixHandler";
import OrderController from "../controllers/orderController";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, fixHandler(OrderController.getMyOrders));

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  fixHandler(OrderController.createCheckoutSession)
);

router.post(
  "/checkout/webhook",
  fixHandler(OrderController.stripeWebhookHandler)
);

export default router;
