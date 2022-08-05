const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide a unique task value.']

    },
    completed: {
      type: Boolean,
      default: false
    }},
    {
        timestamps: true
    })

module.exports = mongoose.model('Todos', todoSchema)