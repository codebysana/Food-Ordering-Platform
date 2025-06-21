import express from "express";
import myUserController from "../controllers/myUserController";
import { fixHandler } from "../../utils/fixHandler";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// api/my/user
router.post("/", jwtCheck, fixHandler(myUserController.createCurrentUser));
router.put(
  "/",
  jwtCheck,
  jwtParse,
  ...validateMyUserRequest,
  fixHandler(myUserController.updateCurrentUser)
);

export default router;
