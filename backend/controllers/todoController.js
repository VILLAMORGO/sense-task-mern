const asyncHandler = require('express-async-handler')

const Todo = require('../models/todoModel')

// @description Get Todos
// @route GET /api/todos
// @access Private

const getTodos = asyncHandler (async (req, res) => {
    const todos = await Todo.find({user: req.user.id})

    res.status(200).json(todos)
})


// @description Create Todos
// @route POST /api/todos
// @access Private
const setTodos = asyncHandler (async (req, res) => {

    if (!req.body.text){
        res.status(400).json({message: 'Text is required'})
    }
    
    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id
    })

    console.log(req.body)
    res.status(200).json(todo)
})


// @description Update Todos
// @route PUT /api/todos/:id
// @access Private
const updateTodo = asyncHandler (async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo){
        res.status(400).json({message: 'Todo not found'})
    }

    // Check for user
    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the loginUser matches the todo user
    if (todo.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')

    }

    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        
    res.status(200).json(updateTodo)
})

// @description Delete Todos
// @route DELETE /api/todos/:id
// @access Private
const deleteTodo = asyncHandler (async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo){
        res.status(400).json({message: 'Todo not found'})
    }


    // Check for user
    if (!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the loginUser matches the todo user
    if (todo.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await todo.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTodos,
    setTodos,
    updateTodo,
    deleteTodo
}