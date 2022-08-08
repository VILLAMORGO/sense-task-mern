import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm'
import UnselectedTodo from '../components/todoFilter/UnselectedTodo'
import CompletedTodo from '../components/todoFilter/CompletedTodo'
import Spinner from '../components/Spinner'
import { getTodos } from '../features/todos/todoSlice'
import { reset } from '../features/auth/authSlice'



function Dashboard() {

  const [todoFormOpen, setTodoFormOpen] = useState(false);
  

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTodos())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='pt-8'>
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">ToDo Dashboard</h1>
        </div>
      </section>
      <span className="absolute top-24 right-44 rounded-full border-2 border-gray-800 px-3 py-1 cursor-pointer text-gray-900" onClick={() => {
        setTodoFormOpen(true)
        }}>
        Create todo
      </span>

      {todoFormOpen && <TodoForm setOpenTodoForm={setTodoFormOpen} />}
      

      <main>
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg dashboard-container overflow-y-hidden">
              {todos.length > 0 ? (
                <div className='todos'>
                  <div>
                    <label htmlFor="text" className='text-2xl'>Todos</label>
                    <div className='todoContainer overflow-y-auto px-5 bg-gray-200 h-full' >
                      {todos.map((todo) => (
                        <UnselectedTodo key={todo._id} todo={todo} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="text" className='text-2xl'>Completed</label>
                    <div className='todoContainer overflow-y-auto px-5 bg-blue-200 h-full' >
                      {todos.map((todo) => (
                        <CompletedTodo key={todo._id} todo={todo} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center flex items-center justify-center h-full'>
                  <h3 className='text-2xl text-gray-300'>You have not set any Todos.</h3>
                </div>
                
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard