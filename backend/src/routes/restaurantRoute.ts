import express from "express";
import { fixHandler } from "../../utils/fixHandler";
import multer from "multer";
import myRestaurantController from "../controllers/myRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get(
  "/",
  jwtCheck,
  jwtParse,
  fixHandler(myRestaurantController.getMyRestaurant)
);

// api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  fixHandler(myRestaurantController.createMyRestaurant)
);

export default router;
