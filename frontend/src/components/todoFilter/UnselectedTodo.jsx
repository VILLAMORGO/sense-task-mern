import { useDispatch } from 'react-redux'

import { deleteTodo } from '../../features/todos/todoSlice'
import { updateCompleted } from '../../features/todos/todoSlice'
import { getTodos } from '../../features/todos/todoSlice'

import { FaRegTimesCircle} from 'react-icons/fa'


function UnselectedTodo({ todo }) {
    
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(updateCompleted(todo._id))
        setTimeout(() => dispatch(getTodos()), 1000)
    }

    if(todo.completed === false) {
        return (
            <div className='todo rounded-lg text-start p-10 bg-gray-900 mx-5 text-white'>
                <h2>{todo.text}</h2>
                <button onClick={() => dispatch(deleteTodo(todo._id))} className='close text-xl text-red-600'>
                    <FaRegTimesCircle/>
                </button>
                <div className="flex justify-start">
                    <input type="checkbox" onClick={onClick} /> 
                    <p className="px-3">Complete</p> 
                </div>
                
            </div>
        )
    }
}

export default UnselectedTodo