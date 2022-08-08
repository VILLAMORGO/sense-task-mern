import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../features/todos/todoSlice'
import { updateCompleted } from '../../features/todos/todoSlice'
import { getTodos } from '../../features/todos/todoSlice'

import {FaRegTimesCircle} from 'react-icons/fa'


function CompletedTodo({ todo }) {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(updateCompleted(todo._id))
        setTimeout(() => dispatch(getTodos()), 500)
    }
    if(todo.completed === true) {
        return (
            <div className='todo rounded-lg text-start p-10 bg-gray-900  text-white'>
                <h2>{todo.text}</h2>
                <button onClick={() => dispatch(deleteTodo(todo._id))} className='close text-xl text-red-600'>
                    <FaRegTimesCircle/>
                </button>
                <div className="flex justify-start">
                    <input type="checkbox" defaultChecked="true" onClick={onClick} /> 
                    <p className="line-through px-3">Complete</p> 
                </div>
            </div>
        )
    }
}

export default CompletedTodo