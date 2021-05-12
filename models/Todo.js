const mongoose = require('mongoose');

const Todo = mongoose.Schema({
    text: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Todo', Todo);
