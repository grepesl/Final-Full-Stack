import express from "express";
import {authenticateToken} from "../Middlewares/authMiddleware.js";
import {changeReaction, getReactionByQuestion} from "../Controllers/likesController.js";

const router = express.Router();

router.post('/', authenticateToken, changeReaction);
router.get('/:id', authenticateToken, getReactionByQuestion);

export default router;