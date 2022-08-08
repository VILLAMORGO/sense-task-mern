import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const { username, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const{user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        
        if(password !== password2) {
            toast.error('Passwords does not match')
        }else{
            const userData = {
                username,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }
    return (
        <div className="mt-10">
            <section className='heading'>
            Create an Account
            </section>
            <section className='max-w-md p-10 mx-auto rounded-lg border-2 shadow-md bg-white'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' 
                            id='username' 
                            placeholder="Username" 
                            name="username" 
                            value={username}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' 
                            id='email' 
                            placeholder="Email address"  
                            name="email" 
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' 
                            id='password' 
                            placeholder="Password" 
                            name="password" 
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' 
                            id='password2' 
                            placeholder="Confirm password" 
                            name="password2" 
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="pt-5">
                        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register