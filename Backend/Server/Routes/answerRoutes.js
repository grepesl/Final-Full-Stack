// routes/userRoutes.js
import {getAnswers, getAnswerById, createAnswer, updateAnswer, deleteAnswer} from '../controllers/answerController.js';
import express from "express";
import {authenticateToken} from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', getAnswers);
router.get('/:id', getAnswerById);
router.post('/', authenticateToken, createAnswer);
router.put('/:id', authenticateToken, updateAnswer);
router.delete('/:id', authenticateToken, deleteAnswer);

export default router;