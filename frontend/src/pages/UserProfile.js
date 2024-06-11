import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../MainContext'




const UserProfile = () => {
  // accepting variable from context
  const {
    userProfileUsername,setUserProfileUsername,
    userProfileImg,setUserProfileImg,userProfileBio,
    setUserProfileBio,userProfileFollowers,
    setUserProfileFollowers,
    userProfileFollowing,setUserProfileFollowing,userProfilePosts,
    setUserProfilePosts,userProfileId
    } =useContext(AppContext)
  // General profile posts
  const [posts,setPosts]=useState([])
    // function section
    // onceLoaded
    useEffect(()=>{
      getUserProfile()
      getGeneralProfilePosts()
    },[])
    const getUserProfile= async ()=>{
      await getProfile()
    }
    // function to updata following
    const updateFollowing= async ()=>{
        let resp= await fetch('http://127.0.0.1:8000/api/user/follow/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
            },
            body:JSON.stringify({'id':userProfileId})
        })
        await getProfile()
    }
  //general user Posts to set them on his profile
  const getGeneralProfilePosts = async ()=>{
    let resp = await fetch(`http://127.0.0.1:8000/api/post/generalUserPosts/${userProfileId}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data =await resp.json()
    console.log('posts',data)
    setPosts(data)
  }    
    // calling api to bring profile---------------------
  const getProfile = async ()=>{
    let resp = await fetch(`http://127.0.0.1:8000/api/user/profile/${userProfileId}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data =await resp.json()
    console.log(data)
    if (resp.status == 200){
      setUserProfileUsername(data.user.username)
      setUserProfileFollowers(data.followers)
      setUserProfileFollowing(data.following)
      setUserProfileImg(data.img)
      setUserProfileBio(data.bio)
      setUserProfilePosts(data.posts)
    }
  }
  return (
    <div className='profile-main-section'>
      <div className='profile-section'>
      {/* --------------------PROFILE INFO SECTION ------------------ */}
        <div className='profile-info flex-around'>
          <div className='profile-pic'>
            <img src={`http://127.0.0.1:8000/${userProfileImg}`} />
          </div>
          <div className='profile-details'>
            <div className='name-follow-section flex-between'>
              <p >{userProfileUsername}</p>
              <button className='btn btn-primary' onClick={updateFollowing}>Follow</button>
            </div>
            <div className='posts-following-details flex-between'>
              <p><span>{userProfilePosts}</span>posts</p>
              <p><span>{userProfileFollowers}</span>followers</p>
              <p><span>{userProfileFollowing}</span>following</p>
            </div>
            <p className='profile-bio'>{userProfileBio}</p>
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
    </div>
  )
}

export default UserProfile
