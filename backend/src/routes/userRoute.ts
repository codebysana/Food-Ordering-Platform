import express from "express";
import myUserController from "../controllers/myUserController";
import { fixHandler } from "../../utils/fixHandler";

const router = express.Router();

// api/my/user
router.post("/", fixHandler(myUserController.createCurrentUser));

export default router;
