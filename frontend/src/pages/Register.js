import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../MainContext'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  // variables section ----------------------------------
  const navigate = useNavigate() 
  const {registerUsername,registerEmail,registerPassword,
    setRegisterEmail,setRegisterPassword,
    setRegisterusername,registerLoading,setRegisterLoading}=useContext(AppContext)
  
  // functions section --------------------------------
  // createNewUser 
  const createNewUser = async()=>{
    setRegisterLoading(true)
    let resp = await fetch('http://127.0.0.1:8000/api/user/create/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'username':registerUsername,
        'password':registerPassword,
        'email':registerEmail})
    })
    if (resp.status === 200){
      setRegisterEmail('')
      setRegisterusername('')
      setRegisterPassword('')
      navigate('/login')
    }else{
      console.log(resp,resp.json())
    }
    setRegisterLoading(false)
  }
  // Handling form submit
  const handleFormSubmit = (e)=>{
    e.preventDefault()
    createNewUser()

  }
  return (
    <div className='auth-page-container'>
      <div className='auth-container'>
        <form className='auth-form' onSubmit={handleFormSubmit}>
          <h2 className='auth-form-header'>Register</h2>
          <hr/>
          <input className='form-input' type='text' placeholder='Entery your name' value={registerUsername} onChange={(e)=>setRegisterusername(e.target.value)}/>
          <input className='form-input' type='email' placeholder='Entery your Email' value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)}/>
          <input className='form-input' type='password' placeholder='Entery password' value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)}/>
          {registerLoading && <div className='rotate'></div>}
          <input className='form-input btn btn-primary' type='submit' value='Register'/>
        </form>
        <p>Already user? <Link to='/login'> Login</Link></p>
      </div>
    </div>
  )
}

export default Register
