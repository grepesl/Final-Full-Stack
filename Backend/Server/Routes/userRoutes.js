// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {getUsers, getUserById, createUser, updateUser} from '../controllers/userController';

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

module.exports = router;