const express = require('express')
const router = express.Router()
const {getTodos, setTodos, updateTodo, deleteTodo} = require('../controllers/todoController')

router.route('/').get(getTodos).post(setTodos)
router.route('/:id').put(updateTodo).delete(deleteTodo)

module.exports = router
