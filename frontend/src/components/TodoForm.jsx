import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todos/todoSlice'
import {FaRegTimesCircle} from 'react-icons/fa'

function TodoForm({setOpenTodoForm}) {
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
       
        setOpenTodoForm(false);
        e.preventDefault()
        dispatch(createTodo({ text }))
        setText('')
    }
    return (
        <section className="w-96 p-10 mx-auto rounded-lg border-2 shadow-md bg-white z-10 absolute left-1/2 -translate-x-1/2 top-60">
            <span className="absolute right-3 top-3 text-2xl cursor-pointer text-red-600" onClick={()=>{
                setOpenTodoForm(false);
            }}>
                <FaRegTimesCircle/>
            </span>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Create Todo</label>
                    <input 
                        type="text" 
                        name="text" 
                        id='text' 
                        placeholder="Create a new Todo"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'  />
                </div>
                <div className='form-group' >
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Create Todo
                            
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TodoForm