const mongoose = require('mongoose');

// created schema for tasks

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

// created and exported mongoose model task as a variable

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;