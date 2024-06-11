import React ,{ useContext } from 'react'
import { AppContext } from '../MainContext'
import { Link, json, useNavigate } from 'react-router-dom'

const Login = () => {

  // variable section----------------------------------
  const 
  {loginLoading,loginPassword,loginUsername,
    setLoginLoading,setLoginPassword,setLoginusername
    } =
     useContext(AppContext)
    const navigate=useNavigate()

  // functions Section ---------------------------------

  // getTokens function
  const getTokens = async ()=>{
    setLoginLoading(true)
    let resp = await fetch('http://127.0.0.1:8000/api/token/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':loginUsername,'password':loginPassword})
      
    })
    let data = await resp.json()
    if (resp.status === 200){
      localStorage.setItem('access',data.access)
      localStorage.setItem('refresh',data.refresh)
      navigate('/')
    }
    setLoginLoading(false)
  }

  //  handling form submitting
  const handleSubmit = (e)=>{
    e.preventDefault()
    getTokens()
  }

  return (
    <div className='auth-page-container'>
      <div className='auth-container'>
        <form className='auth-form' onSubmit={handleSubmit}>
          <h2 className='auth-form-header'>Login</h2>
          <hr/>
          <input className='form-input' type='text' placeholder='Entery your name' value={loginUsername} onChange={(e)=>setLoginusername(e.target.value)}/>
          <input className='form-input' type='password' placeholder='Entery password' value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
          {loginLoading && <div className='rotate'></div>}
          <input className='form-input btn btn-primary' type='submit' value='Login'/>
        </form>
        <p>Create a user? <Link to='/Register'> Register</Link></p>
      </div>
    </div>
  )
}

export default Login
