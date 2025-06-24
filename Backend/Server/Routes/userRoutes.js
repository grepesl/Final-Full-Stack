import {getUsers, getUserById, updateUser} from '../controllers/userController.js';
import express from "express";
import {authenticateToken} from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', authenticateToken, updateUser);

export default router;