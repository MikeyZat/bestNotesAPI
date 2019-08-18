const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    text: String,
    username: String,
    done: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);