// app.js
import express from 'express';
const app = express();

app.use(express.json()); // For parsing JSON request bodies

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});