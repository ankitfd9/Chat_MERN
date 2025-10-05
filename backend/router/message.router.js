import { Router } from "express";
import { getConversation, sendMessage } from "../controller/message.controller.js";
import {protectedRoute} from "../middleware/protectedRoute.js"

const router =Router();

router.post("/send/:id",protectedRoute,sendMessage);
router.get("/:id",protectedRoute,getConversation);

export default router;