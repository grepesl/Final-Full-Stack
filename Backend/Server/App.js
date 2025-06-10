// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from "./Routes/questionRoutes.js";
import answerRoutes from "./Routes/answerRoutes.js";

const app = express();

app.use(express.json()); // For parsing JSON request bodies

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});