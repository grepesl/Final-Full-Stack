// routes/userRoutes.js
import {getAnswers, getAnswerById, createAnswer, updateAnswer} from '../controllers/answerController.js';
import express from "express";

const router = express.Router();

router.get('/', getAnswers);
router.get('/:id', getAnswerById);
router.post('/', createAnswer);
router.put('/:id', updateAnswer);

export default router;