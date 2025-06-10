// routes/userRoutes.js
import {getUsers, getUserById, updateUser, registerUser} from '../controllers/userController.js';
import express from "express";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', registerUser);
router.put('/:id', updateUser);

export default router;