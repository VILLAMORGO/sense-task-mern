import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })

    const { username, email, password1, password2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        

    }
    
  return (
    <>
    <section className='heading'>
    <FaUser/> Create an Account
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    id='username' 
                    placeholder="Enter your desired username" 
                    name="username" 
                    value={username}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    className="form-control" 
                    id='email' 
                    placeholder="Your email address"  
                    name="email" 
                    value={email}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control" 
                    id='password1' 
                    placeholder="Enter a password" 
                    name="password1" 
                    value={password1}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control" 
                    id='password2' 
                    placeholder="Confirm password" 
                    name="password2" 
                    value={password2}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <button type="submit" className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register