const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(exxpress.json()); //Middleware

app.use('/api/users', require('./routes/userRoutes')); //Routes
app.use('/api/posts', require('./routes/postRoutes')); //Routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log("Server is running on ${PORT}")
);


