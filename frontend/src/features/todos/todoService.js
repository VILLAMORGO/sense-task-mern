import axios from 'axios'

const BASE_URL = process.env.BASE_URL
const API_URL = '/api/todos/'

// Create new todo 
const createTodo = async (todoData, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(BASE_URL + API_URL, todoData, config)

    return response.data
}

// Get user todos
const getTodos = async (token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(BASE_URL + API_URL, config)

    return response.data
}

// Delete user todo
const deleteTodo = async (todoId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(BASE_URL + API_URL + todoId, config)

    return response.data
}

// Update complete todo
const updateCompleted = async (todoId, token, isCompleted) => {
    
    var qs = require('qs');
    var todoCompleted = ""

    if (isCompleted === true) { 
        todoCompleted = "false" 
    } else { todoCompleted = "true" }
    
    var data = qs.stringify({
        'completed': todoCompleted,
      });

    var config = {
        method: 'put',
        url: BASE_URL + API_URL + todoId,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        data : data
    };

    const response = await axios(config)
    return response.data
    
}

// Update todo due date
const updateDueTodo = async (todoId, token, isCompleted) => {
    
    var qs = require('qs');
    var todoCompleted = ""

    if (isCompleted === true) { 
        todoCompleted = "false" 
    } else { todoCompleted = "true" }
    
    var data = qs.stringify({
        'completed': todoCompleted,
      });

    var config = {
        method: 'put',
        url: BASE_URL + API_URL + todoId,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        data : data
    };

    const response = await axios(config)
    return response.data
    
}


const todoService = {
    createTodo,
    getTodos,
    deleteTodo,
    updateCompleted,
    updateDueTodo
}

export default todoService