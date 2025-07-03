import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { fixHandler } from "../../utils/fixHandler";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  fixHandler(OrderController.createCheckoutSession)
);
