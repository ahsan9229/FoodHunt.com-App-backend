import express from "express";
import { param } from "express-validator";
import RestaurantController from "../Controllers/RestaurantController";


const router = express.Router();

router.get("/:restaurantId" , param("restaurantId").isString().trim().notEmpty().withMessage("Restaurant id Paramenter must be a  string"),
RestaurantController.getRestaurant);


router.get ("/search/:city", param("city").isString().trim().notEmpty().withMessage("City Paramenter must be a  string"),
RestaurantController.searchRestaurant );


export default router;