const express = require('express');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Home route was hit');
    res.send('StudyMate server is running!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});