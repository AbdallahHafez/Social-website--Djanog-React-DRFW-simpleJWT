import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../MainContext'

const ProtectedRoute = ({children}) => {
    // state variables section------------------------------------
    const{authorized,setAuthorized} = useContext(AppContext)
    // once Loaded
    useEffect(()=>{
        auth()
    },[])

    // functions section
    // Refresh token function ------------------------ 
    const refreshToken = async ()=>{
        const refresh=localStorage.getItem('refresh')
        let resp = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':refresh})
        })
    let data =await resp.json()
    
    if(resp.status === 200 ){
        localStorage.setItem('access',data.access)
        setAuthorized(true)
    }else{
        setAuthorized(false)
    }
    }
    // chech authorization function
    const auth = async () => {
        const access = localStorage.getItem('access')

        if (!access){
            setAuthorized(false)
            return
        }

        const decoded = jwtDecode(access)
        const tokenExp = decoded.exp
        const now = Date.now() / 1000

        if(tokenExp<now){
            await refreshToken()
        }else{
            console.log('wise man pass from here')
            setAuthorized(true)
            console.log(authorized,'authorized')
        }




    }
  // Loading at start
 if(authorized === null){
    return <div>loading</div>
}
  return  authorized ? children : <Navigate to='/login' /> 

}

export default ProtectedRoute
