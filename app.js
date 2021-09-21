require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');
const cors = require('cors');
const todoRoutes = require('./routes/todos.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware')

connectDb();

const app = express();

app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000']
    })
);

app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/todos', todoRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => console.log(`Server listen on Port ${process.env.PORT}`));