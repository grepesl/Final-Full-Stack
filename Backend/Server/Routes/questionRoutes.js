import {getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion} from '../controllers/questionController.js';
import express from "express";
import {authenticateToken} from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', authenticateToken, createQuestion);
router.put('/:id', authenticateToken, updateQuestion);
router.delete('/:id', authenticateToken, deleteQuestion);

export default router;