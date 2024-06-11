# Social website(Instagram like)--Djanog-React-DRFW-simpleJWT

I created this website from scratch using : Django,Djangorestframework,React,simpleJWT

# Feaatures of the website:

Authentication system

Ability to create post

Ability to like/unlike post

Ability to comment to post

Ability to follow/unfollow other users.

All of this done without refreshing page


to run the code:

1- donwnload it but don't foget to add node modules with necessary packages in order to react to work.

2- run python manage.py runserver , as i integrated both of frontend and backend together in order to make both of them run with this command.







# SOCIALWEB USING DJANGO - DJANGORESTFRAMEWORK - REACT 
# Features:

    Header : 
        Social       Home messages image/profile  settings logout
        
    1- main page
        create post
        user posts
        friends posts
        suggestions section

    2- profile page
        profile info
        following / followers

    3- chat page
        send messages, recieve messages, messages field

# ############### backend part#######################
# * Database design:

name-email-password-img-followingnum-followersnumb-posts-postimg-postcatption-created-updataed-likes comments-likedby-messagesbody-messagefrom-messageto

* normalisation step:
- User :username - password - email
- Profile : user(one to one) - profile_img - bio - followingnum - followernum
- Post : Profile(one to many) - post_img - caption 
- Comment: profile(one to many) - post(one to many) - body - created - updated 
- Like: Profile(one to Many) - Post (onetomany)
- Follow:Profile(one to many) - Profile(one to many)

* Apps:
- profile
- posts

# create usercreaetion endpoint  
    * authentication app:
        - view -> data collection and manipulation post
        - serializer -> json -> model objects --> save
        - Response : created user info
        - url : direct user to specific view
# update profile:
    - profile already created due to signaling
    - view -> Get/Post
            -> if user is who send the request ->bring his profile->add bio/img
    - url
    - serializaiton ->profile model

# Post / create/update/delete :post application
    - model already exists
    - two views:
        -serialize Post Model
        - view: createListPosts->for now show all posts(later->show my and follower posts)
        - view : updateDeletePost -> useronlycanupdateanddelete
        - url -> for two views
# Comment /create/update/delete : 
    - model already exists
    - serializer comments
    - two view : 
        ->createListComment(which user ,and which post)
        ->updateDeleteComment(which user, which post,which comment)
    - url 
# creat like system:
    - post - user ->like one time, second time remove the like
    - user already known
    - post, send postId ->get the post
    - get count_set 
    - check if user in  any delete, if not create
    #get post
    #get user
    #check if there is like boject with post and user
    #if any delete
    #else create

# create following system:
    - user who send data -> fol
    - followed -> owner of the profile
    - follower -> reqeusted user
    - get follow object where  followed = followed , follower=request.user.profile
    - if there is object remove it, if there is no object create it
    - show these numbers in  Profile through serializer

# ####################################Frontend Part###################################
# corsheaders
# simplejwt authentication
# prerpare working environment
     - create-react-app 
     - i react-router-dom 
     - i jwt-decode
# Directory structuring:src/
    - Pages
    - components
    - images
    - MainContext.jsx
# MainContext.jsx : 
    - create : ->createContext (AppContext) ->as component
    - MainContext return AppContext.provider ->children(App)
# create these pages Home Register Login :
# create register page:
    - we need ->username,password,email
                send them to http://127.0.0.1:8000/api/user/create/ *POST
    if it succed -> redirect user to login page

# create login page
    - idea of login page->
         - we need a token(access,refresh)
         - send username,password to http://127.0.0.1:8000/api/token/ *post
         - get access,refresh token, store them locally

    - steps: ->
        - create loginpage
        - create loginUsername,loginPassword
        - change their value according to inputs
        - send post request to get tokens
        - recieve tokens and store them locally
        - redirect user to / 

# PROTECT HOME PAGE
    -any return direct user to login
    - once loaded (useEffect):
        * token? ->if no ->return 
                if yes, check if it's valid--> yes? enter
                                           --> no ? refresh
    - refresh -->
        * send refresh token from local storage.
        * get token and store them on local storage or direct to login page

# Building profile page
    - to call the profile view we need an id of the profile.
    - how to get id of my-profile?
        decode access token and  bring use_id ->pass it to profile url
    - just for now, we will make button for profile in home page -> on click ->fire  getProfile function
    - viewProfileFunction -> send api call with GET method  to 
                            http://127.0.0.1:8000/api/user/profile/2 - > console.log data
    -MainContext creae profile varaible to store data and chage their value when getProfile is fired
    - user ->click(profileimg)-call backend (id-> decoded)--if ok--->profile page
# create simple header for now:
# UpdateProfile -> at profile page
    - create settings icon
    - once clicked , trigger a function to show form
    - this form has inputs with corresponding profile data
    - submit this data to the following url
     http://127.0.0.1:8000/api/user/profile/2 with put method
    - call getProfileFunction

# Home page : 
    - get all posts:http://127.0.0.1:8000/api/post/list/
    - just for now, button ->create post, once click show form  
    - form collect img, caption -> send them to http://127.0.0.1:8000/api/post/list/ as post method ->getAllPosts
# home-> click username-> go to his profile?
    - create toUserProfile funtion in p of username
    - api call 
    - create UserProfile.js and add necessary code from profile.
# following:
    - click -> updateFollowing function
    - updateFollowing function -> api    post body,id of profile
    http://127.0.0.1:8000/api/user/follow/
# Comment:
    - to create a comment: we need variable , function
    - i did it?

