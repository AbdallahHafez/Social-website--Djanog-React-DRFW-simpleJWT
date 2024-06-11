from django.shortcuts import render
from .models import Post,Comment,Like
from .serializers import PostSerializer,CommentSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.models import Profile
# ####################POST VIEWS SECTION #############################
# Posts List and create -> view
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def createListPost(request):
    #GET method=>for now return all posts
    if request.method=='GET':
        posts=Post.objects.all().order_by('-created')
        serializer=PostSerializer(posts,many=True)
        return Response(serializer.data)
    
    #POST method -> create new POST
    if request.method == "POST":
        img = request.data.get('img','')
        caption = request.data.get('caption','')
        new_post=Post.objects.create(
            user=request.user.profile,
            img=img,
            caption=caption
        )
        serializer=PostSerializer(new_post,many=False)
        return Response(serializer.data)

# single post getting updating deleting
@api_view(['GET','PUT','DELETE'])
def postUpdateDelete(request,pk):
    post=Post.objects.get(id=pk)
    #GET -> show the post
    if request.method == 'GET':
        serializer=PostSerializer(post,many=False)
        return Response(serializer.data)
    #PUT -> check that he is the owner->update
    if request.method == 'PUT':
        if request.user==post.user.user:
            post.img = request.data.get('img',post.img)
            post.caption = request.data.get('caption',post.caption)
            post.save()
            serializer=PostSerializer(post,many=False)
            return Response(serializer.data)
        return Response({'message':'you are not allowed here'})
    #DELETE-> check that he is the owner-> delete
    if request.method == 'DELETE':
        if request.user==post.user.user:
            post.delete()
            return Response({'message':'data deleted'},status=204)
        return Response({'message':'you are not allowed here'})   

# USER'S POST LIST VIEW  
@ api_view(['GET'])
@ permission_classes([IsAuthenticated])  
def getUserPosts(request):
    user = request.user.profile
    posts=Post.objects.filter(user=user).order_by('-updated')          
    serializer=PostSerializer(posts,many=True)
    return Response(serializer.data)
# eneral USER'S POST LIST VIEW  
@ api_view(['GET'])
@ permission_classes([IsAuthenticated])  
def getGeneralUserPosts(request,pk):
    user =Profile.objects.get(id=pk)
    posts=Post.objects.filter(user=user).order_by('-updated')          
    serializer=PostSerializer(posts,many=True)
    return Response(serializer.data)
# ####################COMMETN VIEWS SECTION #############################

# Getting list of comments related to specific post,and creaet new comments
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def listcreateComment(request,pk):   
    # getting sended data
    user = request.user.profile      
    #GET VIEW :->get all comments related to post ->serialize it->return it
    if request.method == 'GET':
        post=Post.objects.get(id=pk)
        comments=Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data)
        
    #POST VIEW :->create new comment for post ->serialize it->return it

    if request.method == 'POST':
        body=request.data.get('body') 
        post=Post.objects.get(id=pk)
        new_comment=Comment.objects.create(
            user=user,
            post=post,
            body=body
            )
        serializer = CommentSerializer(new_comment,many=False)
        return Response(serializer.data)

# Single comments:  updating deleting comments related to specific post
@api_view(['PUT','DELETE'])
def updateDeleteComment(request,pk):
    comment = Comment.objects.get(id=pk)
    if request.method == "PUT":
        if request.user == comment.user.user:
            comment.body =request.data.get('body')
            comment.save()
            serializer = CommentSerializer(comment,many=False)
            return Response(serializer.data)
        return Response({'message':'you are not allowed here'})
    if request.method == "DELETE":
        if request.user == comment.user.user:
            comment.delete()
            return Response({'message':'comment deleted succesfully'})
        return Response({'message':'you are not allowed here'})
     
##################### LIKE SYSTEM######################################     
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request):
    user = request.user.profile
    post_id = request.data.get('post')
    post=Post.objects.get(id=post_id)

    try:
        like = Like.objects.get(user=user,post=post)
    except:
        like = None
    if like != None:
        like.delete()
        return Response({'message':'like deleted'})
    else:
        Like.objects.create(user=user,post=post)
        return Response({'message':'like created'})