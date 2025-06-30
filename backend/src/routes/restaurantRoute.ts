import express from "express";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parament must be a valid string"),
  RestaurantController.searchRestaurants
);
