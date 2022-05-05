const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxLength: [30, 'task can not be more  than 30 characters'],
    },
    reminder: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema);