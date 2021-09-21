const { Router } = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User');
const router = Router();

router.get('/', async (request, response) => {
    try {
      const todos = await Todo.find();
      response.status(200).json(todos);
    } catch (error) {
      response.status(500).json({ message: 'ServerError', error });
    }
});

router.post('/', async (request, response) => {
    try {
        const user = { user: request.user.id }
        const newTodo = await Todo.create({...request.body, ...user});
        await User.findByIdAndUpdate(user, { $push: { todos: newTodo.id } }, { new: true })
        response.status(201).json(newTodo);
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedTodo);
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await Todo.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

module.exports = router;