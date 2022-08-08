import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new todo
export const createTodo = createAsyncThunk(
    'todos/create',
    async (todoData, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.createTodo(todoData, token)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user todos
export const getTodos = createAsyncThunk(
    'todos/getAll',
    async (_, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.getTodos(token)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user todo
export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.deleteTodo(id, token)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update complete todo
export const updateCompleted = createAsyncThunk(
    'todos/update', 
    async (id, thunkAPI) => {
        try {
        
        const token = thunkAPI.getState().auth.user.token
        const isCompleted = thunkAPI.getState().todos.todos.find( o => o._id === `${id}`).completed
        return await todoService.updateCompleted(id, token, isCompleted)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update user todo
export const updateDueTodo = createAsyncThunk(
    'todos/dueUpdate', 
    async (id, thunkAPI) => {
        try {
        
        const token = thunkAPI.getState().auth.user.token
        const isCompleted = thunkAPI.getState().todos.todos.find( o => o._id === `${id}`).completed
        return await todoService.updateDueTodo(id, token, isCompleted)
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTodo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos.push(action.payload)
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTodos.pending, (state) => {
            state.isLoading = false
        })
        .addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = action.payload
        })
        .addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteTodo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = state.todos.filter(
            (todo) => todo._id !== action.payload.id
            )
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateCompleted.pending, (state) => {
            state.isLoading = false
        })
        .addCase(updateCompleted.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos.push(action.payload)
        })
        .addCase(updateCompleted.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateDueTodo.pending, (state) => {
            state.isLoading = false
        })
        .addCase(updateDueTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos.push(action.payload)
        })
        .addCase(updateDueTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer