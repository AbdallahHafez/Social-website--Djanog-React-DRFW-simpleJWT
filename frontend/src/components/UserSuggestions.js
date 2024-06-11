import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../MainContext'
import { useNavigate } from 'react-router-dom'
const UserSuggestions = () => {
  // Variables section ---------------------------------
  const navigate = useNavigate()
  // context variables
  const {profiles,
    setUserProfileUsername,
    setUserProfileImg,
    setUserProfileBio,
    setUserProfileFollowers,
    setUserProfileFollowing,
    setUserProfileId,
    setUserProfilePosts}=useContext(AppContext)
  // Functions section ----------------------------------
  // show user profile function=>when click username
  const toUserProfile= async (id)=>{
    let resp = await fetch(`http://127.0.0.1:8000/api/user/profile/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data =await resp.json()
    if (resp.status == 200){
      setUserProfileUsername(data.user.username)
      setUserProfileFollowers(data.followers)
      setUserProfileFollowing(data.following)
      setUserProfileImg(data.img)
      setUserProfileBio(data.bio)
      setUserProfilePosts(data.posts)
      setUserProfilePosts(data.posts)
      setUserProfileId(id)
      navigate('/userprofile')
    }
    }
  return (
    <div className='home-page-friends-suggestions'>
    <h2 className='friendsSugesstionsHeader'>User suggestions</h2>
    <hr></hr>
    <div className='friendsSugesstionsContainer'>
      {profiles?.map((profile)=>{
        return( 
        <div className='friendsSugesstionsCard flex-between'>
          <div className='friendsSugesstionsCardImg'><img src={`http://127.0.0.1:8000/${profile.img}`} /></div>
          <div className='friendsSugesstionsCardInfo'>
            <p onClick={()=>{toUserProfile(profile.id)}}>{profile.user.username}</p>
            <div className='friendsSugesstionsCardDetail flex-between'>
              <p>{profile.followers} followers</p>
              <p>{profile.following} following</p>
            </div>
          </div>
        </div>
      )})}

    </div>
  </div>     
  )
}

export default UserSuggestions
