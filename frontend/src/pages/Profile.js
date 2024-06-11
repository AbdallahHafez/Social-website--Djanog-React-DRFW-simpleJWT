import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../MainContext'
import { jwtDecode } from 'jwt-decode'
import SettingIcon from '../images/gear.svg'
import Close from '../images/x.svg'

const Profile = () => {
  // accepting variable from context
  const {
    setProfileUsername,setProfileImg,setProfileBio,
    setProfileFollowers,setProfileFollowing,profileUsername,
    profileImg,profileBio,profileFollowers
    ,profileFollowing,profilePosts,setProfilePosts
    } =useContext(AppContext)
  // update profile form --variables section
  const [showProfile,setShowProfile]=useState(false)
  // profile posts
  const [posts,setPosts]=useState([])
  // once Loaded --------------------------------------
  useEffect(()=>{
   getProfile()
   getProfilePosts()
  },[])

  // calling api to bring profile---------------------
  const getProfile = async ()=>{
    // getting profile id  from access token
    const access = localStorage.getItem('access')
    const decoded = jwtDecode(access)
    const user_id = decoded.user_id
    let resp = await fetch(`http://127.0.0.1:8000/api/user/profile/${user_id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data =await resp.json()
    if (resp.status == 200){
      setProfileUsername(data.user.username)
      setProfileFollowers(data.followers)
      setProfileFollowing(data.following)
      setProfileImg(data.img)
      setProfileBio(data.bio)
      setProfilePosts(data.posts)
    }
     
  }
  // gettign logged in user Posts to set them on his profile
  const getProfilePosts = async ()=>{
    let resp = await fetch(`http://127.0.0.1:8000/api/post/userPosts/`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data =await resp.json()
    setPosts(data)
  }

  // Calling api to update profile --> updateProfile function
  const updateProfile = async ()=>{
    // getting profile id  from access token
    const access = localStorage.getItem('access')
    const decoded = jwtDecode(access)
    const user_id = decoded.user_id
    const formData = new FormData()
    formData.append('img',profileImg)
    formData.append('bio',profileBio)
    console.log('formData',formData)
    let resp = await fetch(`http://127.0.0.1:8000/api/user/profile/${user_id}`,{
      method:'PUT',
      headers:{
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      },
      body:formData
    })   
    console.log(resp.json())
  }
  // Handle submit updating form for updating profile
  const handleSubmit = async (e)=>{
    e.preventDefault()
    updateProfile()
    await getProfile()
    setShowProfile(false)
  }
  console.log(`http://127.0.0.1:8000${profileImg}`)
  return (
    <div className='profile-main-section'>
      <div className='profile-section'>
      {/* --------------------PROFILE INFO SECTION ------------------ */}
        <div className='profile-info flex-around'>
          <img src={SettingIcon} className='setting-icon' onClick={()=>{setShowProfile(true)}}/>
          <div className='profile-pic'>
            <img src={`http://127.0.0.1:8000/${profileImg}`} />
          </div>
          <div className='profile-details'>
            <div className='name-follow-section flex-between'>
              <p >{profileUsername}</p>
              {/* <button className='btn btn-primary'>Follow</button> */}
            </div>
            <div className='posts-following-details flex-between'>
              <p><span>{profilePosts}</span>posts</p>
              <p><span>{profileFollowers}</span>followers</p>
              <p><span>{profileFollowing}</span>following</p>
            </div>
            <p className='profile-bio'>{profileBio}</p>
          </div>
        </div>
        {/* --------------------PROFILE POSTS SECTION ------------------ */}
        <div className='profile-posts'>
          <h2 className='posts-headers'>POSTS</h2>
          <hr/>
          <div className='profile-posts-container'>
              {posts?.map(post=>
                <div className='profile-post'>
                
                 <img src={`http://127.0.0.1:8000/${post.img}`} className='profilePostsImg' />
                  <p>{post.caption}</p>
                </div>)
              }

          </div>
        </div>

      </div>
      {showProfile && 
    <div className='profile-modify-form'>
      <div className='profile-form'>
        <img src={Close} className='close-profile-form' onClick={()=>{setShowProfile(false)}} />
        <h2 className='profile-form-header'>Update Profile</h2>
        <hr/>
        <form onSubmit={handleSubmit}>
          <input className='form-input' type='file' accept='image/*' placeholder='choose picture' onChange={(e)=>{setProfileImg(e.target.files[0])}}/>
          <textarea className='form-input' placeholder='Say something about yourself' value={profileBio} onChange={(e)=>{setProfileBio(e.target.value)}}></textarea>
          <input type='submit' value='Submit' className='btn btn-primary form-input' />
        </form>
      </div>
    </div>
    }
    </div>
  )
}

export default Profile
