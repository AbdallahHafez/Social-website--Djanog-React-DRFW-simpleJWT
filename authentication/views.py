from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserSerializer,ProfileSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile,Follow
#####################################USER RELATED VIEWS #####################
# create user endpoint
@api_view(['POST'])
def createUser(request):
    # getting data from the user
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']
    # creating user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    # creating profile for user
    Profile.objects.create(user=user)
    #serializer user and return it
    serializer=UserSerializer(user,many=False) 
    return Response(serializer.data)


# Get/update profile endpoint
@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def showUpdateProfile(request,pk):    
    # Getting selected profile from database
    profile = Profile.objects.get(id=pk)

    # if method is get -> serialize queried profile and return it
    if request.method == "GET":
        serializer=ProfileSerializer(profile,many=False)
        return Response(serializer.data)

    # if method is put - check that he is the owner - update it
    if request.method == "PUT":
        if request.user == profile.user:
            print('data',request)
            # if user didn't pass value use the original value
            profile.bio=request.data.get('bio',profile.bio)
            profile.img=request.data.get('img',profile.img)
            profile.save()
            serializer=ProfileSerializer(profile,many=False)
            return Response(serializer.data)
        return Response({"message":"you are not allowed here"})
#  Create list profile for profile suggestions
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profileList(request):
    profiles=Profile.objects.all()
    serializer=ProfileSerializer(profiles,many=True)
    return Response(serializer.data)
#############################FOLLOWING SYSTEM#####################
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def following(request):
    follower = request.user.profile
    followed_id = request.data.get('id')
    followed=Profile.objects.get(id=followed_id)
    try:
        follow=Follow.objects.get(followed=followed,follower=follower)
    except:
        follow =None
    print('follow:',follow)
    print('follower:',follower)
    print('followed:',followed)
    if follow != None:
        follow.delete()
        return Response({'message':'deleted'})

    else:        
        Follow.objects.create(followed=followed,follower=follower)
        return Response({'message':'following'})