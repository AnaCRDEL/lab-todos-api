const express = require('express');
const connectDb = require('./config/db.config');

const Todo = require('./models/Todo');

const PORT = 5000;

connectDb();

const app = express();

app.use(express.json());

app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ msg: 'ServerError', error });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ msg: 'ServerError', error });
    }
});

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ msg: 'ServerError', error });
    }
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json('Successfully deleted')
    } catch (error) {
        res.status(500).json({ msg: 'ServerError', error });
    }
});


app.listen(PORT, () => console.log(`Server listen on Port ${PORT}`));