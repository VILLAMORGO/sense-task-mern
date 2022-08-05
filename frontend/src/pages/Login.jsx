import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password1: '',
    })

    const {email, password1 } = formData

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
    <FaSignInAlt/> Log in to your Account
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            
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
                    placeholder="Enter your password" 
                    name="password1" 
                    value={password1}
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

export default Login