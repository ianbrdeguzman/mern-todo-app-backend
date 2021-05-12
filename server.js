const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

mongoose.connect(
    'mongodb+srv://admin:admin123@cluster0.0yc2m.mongodb.net/todosDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);

mongoose.connection.once('open', () => {
    console.log('Mongodb connection successful');
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

app.post('/create', (req, res) => {
    const todo = new Todo(req.body);
    todo.save()
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id, (err, todo) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

app.delete('/delete', (req, res) => {
    Todo.remove({ completed: true }, (err, todo) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const bool = req.body.completed;
    const filter = { _id: id };
    const update = { completed: bool };
    Todo.findOneAndUpdate(filter, update, { new: true }, (err, todo) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todo);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
