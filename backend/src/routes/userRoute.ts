import express from "express";
import myUserController from "../controllers/myUserController";
import { fixHandler } from "../../utils/fixHandler";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// api/my/user
router.post("/", jwtCheck, fixHandler(myUserController.createCurrentUser));
router.put("/", fixHandler(myUserController.updateCurrentUser));

export default router;
