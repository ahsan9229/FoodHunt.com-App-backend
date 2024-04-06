import express from "express";
import multer from "multer";
import MyRestaurantController from "../Controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateMyRestaurantReqeust } from "../middleware/Validation";

const router =express.Router();

const storage = multer.memoryStorage();

const upload =multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyResturantOrders
);
router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus
);
// /api/my/restaurant

router.post("/" , upload.single("imageFile"), validateMyRestaurantReqeust, jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant)
router.get("/",jwtCheck ,jwtParse, MyRestaurantController.GetMyResturant )
router.put("/",upload.single("imageFile"), validateMyRestaurantReqeust, jwtCheck, jwtParse,MyRestaurantController.UpdateMyRestaurant)
export default router;
