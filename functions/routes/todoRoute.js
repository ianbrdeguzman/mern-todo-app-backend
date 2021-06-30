const express = require('express');
const Todo = require('../models/todoModel.js');

const todoRoute = express.Router();

// get all todos route
todoRoute.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.find({});
        res.status(200).send(todos);
    } catch (error) {
        next(error);
    }
});

// create todo route
todoRoute.post('/create', async (req, res, next) => {
    try {
        const todo = await Todo.create(req.body);
        const createdTodo = await todo.save();
        res.status(200).send(createdTodo);
    } catch (error) {
        next(error);
    }
});

// delete todo route
todoRoute.delete('/delete/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send(todo);
    } catch (error) {
        next(error);
    }
});

// delete all todo route
todoRoute.delete('/delete', async (req, res, next) => {
    try {
        const todo = await Todo.deleteMany({ completed: true });
        res.status(200).send(todo);
    } catch (error) {
        next(error);
    }
});

// update todo route
todoRoute.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const bool = req.body.completed;
        const filter = { _id: id };
        const update = { completed: bool };

        const updatedTodo = await Todo.findOneAndUpdate(filter, update, {
            new: true,
        });

        res.status(200).send(updatedTodo);
    } catch (error) {
        next(error);
    }
});

module.exports = todoRoute;
