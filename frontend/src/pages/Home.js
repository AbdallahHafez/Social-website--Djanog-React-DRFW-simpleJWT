import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../MainContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Create from '../images/plus-square-fill.svg'
import Heart from '../images/heart.svg'
import Close from '../images/x.svg'
import UserSuggestions from '../components/UserSuggestions'
const Home = () => {
  // variables section -------------------------------------
  const navigate = useNavigate()
  // context variables
  const {
    allPosts,setAllPosts, 
      setUserProfileUsername,
      setUserProfileImg,
      setUserProfileBio,
      setUserProfileFollowers,
      setUserProfileFollowing,
      setUserProfileId,
      setUserProfilePosts,getProfiles,profiles
      } =useContext(AppContext)

  // create post form variable
  const [showCreate,setShowCreate]=useState(false)
  const [postCaption,setPostCaption]=useState('')
  const [postImg,setPostImg]=useState('')
  // Creat comments variable
  const [comment,setComment]=useState('')
  const [comments,setComments]=useState([])
  //  functions section ----------------------------------------
  // once loaded
  useEffect (()=>{
    getPosts()
   getProfiles()

  },[])
  // getAllPosts
  const getPosts = async ()=>{
    let resp = await fetch('http://127.0.0.1:8000/api/post/list/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${String(localStorage.getItem('access'))}`
      }
    })
    let data = await resp.json()
    setAllPosts(data)
    console.log(data)
  }

  const createPost= async ()=>{
    let formData = new FormData()
    formData.append('img',postImg);
    formData.append('caption',postCaption)
    let resp = await fetch('http://127.0.0.1:8000/api/post/list/',{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${String(localStorage.getItem('access'))}`
      },
      body:formData
    })
  }
 // create-delete likes
 const likes =  async (id)=>{
  let resp = await fetch('http://127.0.0.1:8000/api/post/like/',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${String(localStorage.getItem('access'))}` 
    },
    body:JSON.stringify({'post':id})
  })
  await getPosts()
}

// get all comments of post
const createComment = async (e,id)=>{
  e.preventDefault()
  let resp = await fetch(`http://127.0.0.1:8000/api/post/comments/${id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
    },
    body:JSON.stringify({'body':comment})
  })
  // await getComments(id)
  getPosts()
  setComment('')
}
//  getting all comments for post function
const getComments=async (id)=>{
  let resp = await fetch(`http://127.0.0.1:8000/api/post/comments/${id}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${String(localStorage.getItem('access'))}`
    }
  })
  let data=await resp.json()
  setComments(data)
  console.log(comments)
}

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

  const handleSubmit= async (e)=>{
    e.preventDefault()
    await createPost()
    await getPosts()
    setShowCreate(false)
  }

  return (
    <>
      <div className='home-page-section'>
        <div className='home-page-container flex-between'>
          {/* ############Home Page Posts part starts here############## */}
          <div className='home-page-posts'>
    <img src={Create} className='create-new-post' onClick={()=>setShowCreate(true)}/>
    {allPosts?.map((post)=>{
      return(
    <div className='post-card'>
      <div className='post-user-details flex-between'>
        <img src={`http://127.0.0.1:8000/${post.user.img}`} />
        <p onClick={()=>{toUserProfile(post.user.user.id)}}>{post.user.user.username}</p>
      </div>
      <div className='post-img-caption'>
        <img src={`http://127.0.0.1:8000/${post.img}`}/>
        <p>{post.caption}</p>
      </div>
      <div className='post-like-comments'>
        <div className='post-likes flex-between'>
          <img src={Heart} onClick={()=>{likes(post.id)}} />
          <p><span>{post.likeCount}</span> likes</p>
        </div>
        <div className='post-comments-wrapper'>
          <div className='post-comments'>
            {post.comments?.map((comment)=>{
            return(                    
            <div className='post-comment flex-between'>
              <img  src={`http://127.0.0.1:8000/${comment.user.img}`} />
              <p>{comment.body}</p>
            </div>
            )})}

          </div>

          <div className='post-comments-form'>
            <form className='flex-between' onSubmit={(e)=>createComment(e,post.id)}>
              <input type='text' required value={comment} onChange={(e)=>setComment(e.currentTarget.value)} />
              <input type='submit' value='send' />
            </form>
          </div>
        </div>
      </div>
    </div>              
    )})}

  </div>
          {/* ############Home Page Posts part ends here############## */}


          {/* ############Friends suggestton part starts here############## */}
            <UserSuggestions/>
          {/* ############Friends suggestton part ends here############## */}

        </div>
      </div>
      
      {showCreate && 
        <div className='create-post-form'>
          <div className='post-form'>
            <img src={Close} className='close-post-form' onClick={()=>{setShowCreate(false)}} />
            <h2 className='post-form-header'>New Post</h2>
            
            <form onSubmit={handleSubmit}>
              <input className='form-input' type='file' accept='image/*' placeholder='choose picture' onChange={(e)=>{setPostImg(e.target.files[0])}}/>
              <input className='form-input' placeholder='Say something' value={postCaption} onChange={(e)=>{setPostCaption(e.target.value)}}></input>
              <input type='submit' value='Submit' className='btn btn-primary form-input' />
            </form>
          </div>
        </div>
    }
    </>
  )
}

export default Home
