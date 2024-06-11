import React ,{ createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// App context 
const AppContext = createContext()

//  MainContext component
const MainContext = ({children}) => {

  // ############## State Variables section######################## 

  // General variables ----------------------------------------
  
  // Register page state variables -----------------------------
  const [registerUsername,setRegisterusername]=useState('')
  const [registerEmail,setRegisterEmail]=useState('')
  const [registerPassword,setRegisterPassword]=useState('')
  const [registerLoading,setRegisterLoading]=useState(false)

  // Login page state variables -----------------------------
  const [loginUsername,setLoginusername]=useState('')
  const [loginPassword,setLoginPassword]=useState('')
  const [loginLoading,setLoginLoading]=useState(false)

  // protected view state variables ------------------------------
  const [authorized,setAuthorized] = useState(null)

  // Profile Page state variable
  const [profileUsername,setProfileUsername] = useState('')
  const [profileImg,setProfileImg] = useState()
  const [profileBio,setProfileBio] = useState('')
  const [profileFollowers,setProfileFollowers] = useState(Number)
  const [profileFollowing,setProfileFollowing] = useState(Number)
  const [profilePosts,setProfilePosts] = useState(Number)
  //User Profile Page state variable
  const [userProfileUsername,setUserProfileUsername] = useState('')
  const [userProfileImg,setUserProfileImg] = useState()
  const [userProfileBio,setUserProfileBio] = useState('')
  const [userProfileId,setUserProfileId] = useState()
  const [userProfileFollowers,setUserProfileFollowers] = useState(Number)
  const [userProfileFollowing,setUserProfileFollowing] = useState(Number)
  const [userProfilePosts,setUserProfilePosts] = useState(Number)

  // Home Page state variable
  const [allPosts,setAllPosts] = useState([])
  // profileList state variable
  const[profiles,setProfiles]=useState([])
  // ######################## Functions section ################### 
  // Get all profiles function
  const getProfiles=async()=>{
    let resp=await fetch('http://127.0.0.1:8000/api/user/profileList/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data=await resp.json()
    setProfiles(data)
  }
  // Register page functions section ----------------------------

  return (
    <AppContext.Provider value={{
      registerUsername,registerEmail,registerPassword,
      registerLoading,setRegisterLoading,setRegisterEmail,
      setRegisterPassword,setRegisterusername,loginLoading,
      loginPassword,loginUsername,setLoginLoading,setLoginPassword,
      setLoginusername,authorized,setAuthorized,profileUsername,setProfileUsername,
      profileImg,setProfileImg,profileBio,setProfileBio,profileFollowers,setProfileFollowers,
      profileFollowing,setProfileFollowing,profilePosts,setProfilePosts,allPosts,setAllPosts,
      userProfileUsername,setUserProfileUsername,
      userProfileImg,setUserProfileImg,userProfileBio,setUserProfileBio,userProfileFollowers,setUserProfileFollowers,
      userProfileFollowing,setUserProfileFollowing,userProfilePosts,setUserProfilePosts,userProfileId,setUserProfileId,
      getProfiles,profiles
    }}>

        {children}
    </AppContext.Provider>
  )
}
export {AppContext}
export default MainContext
