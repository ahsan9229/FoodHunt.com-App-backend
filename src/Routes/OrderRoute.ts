import express from "express";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import OrderController from "../Controllers/OrderController";


const router =express.Router();
router.get('/', jwtCheck, jwtParse , OrderController.getMyOrders)

router.post("/checkout/create-checkout-session", jwtCheck,jwtParse, OrderController.createCheckoutSession);
// router.post("/api/order/checkout/webhook")
router.post('/checkout/webhook', OrderController.stripeWebhookHandler);




export default router;