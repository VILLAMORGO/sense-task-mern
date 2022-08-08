import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <header className="bg-gray-800 flex flex-center justify-between h-11 text-white text-justify">
            <div className="text-justify h-full py-2 px-8">
                <Link className='text-white ' to="/">Sense-task</Link>
            </div>
            <ul className="w-1/5">
                {user ? (
                    <div className="flex justify-evenly ">
                        <li className="flex justify-end">
                            <p className='flex items-center'>
                                Welcome {user.username}
                            </p>
                        </li>
                        <li className="flex justify-end">
                            <button className='flex justify-evenly items-center px-4' onClick={onLogout}>
                                Sign-out
                            </button>
                        </li>
                    </div>
                    ) : (
                    < div className="flex justify-evenly">
                        <li className=" flex justify-center w-1/2 text-white ">
                            <Link  to='/login' className=" text-white flex justify-evenly items-center">
                                Login
                            </Link>
                        </li>
                        <li className=" flex justify-center w-1/2 text-white">
                            <Link to='/register' className="text-white flex  items-center">
                                Register
                            </Link>
                        </li>
                    </ div>
                )}
            </ul>
        </header>
    )
}

export default Navbar