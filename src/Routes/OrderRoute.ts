import express from "express";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import OrderController from "../Controllers/OrderController";
import Order from "../Models/order";

const router =express.Router();

router.post("/checkout/create-checkout-session", jwtCheck,jwtParse, OrderController.createCheckoutSession);
// router.post("/api/order/checkout/webhook")
router.post('/checkout/webhook', OrderController.stripeWebhookHandler)

export default router;