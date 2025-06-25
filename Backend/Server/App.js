import express from 'express';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from "./Routes/questionRoutes.js";
import answerRoutes from "./Routes/answerRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cors from 'cors';
import dotenv from "dotenv";
import likeRoutes from "./Routes/likeRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:' + process.env.FRONTEND_PORT,
    credentials: true
}));

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/auth', authRoutes);
app.use('/likes',likeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});