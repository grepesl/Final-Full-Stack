// routes/userRoutes.js
import {getUsers, getUserById, createUser, updateUser} from '../controllers/userController.js';
import express from "express";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;