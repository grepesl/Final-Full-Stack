// routes/userRoutes.js
import {getQuestions, getQuestionById, createQuestion, updateQuestion} from '../controllers/questionController.js';
import express from "express";

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', createQuestion);
router.put('/:id', updateQuestion);

export default router;