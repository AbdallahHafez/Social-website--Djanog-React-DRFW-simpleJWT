from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import Post,Comment
from authentication.serializers import ProfileSerializer

class CommentSerializer(ModelSerializer):
    user=ProfileSerializer()    
    class Meta:
        model=Comment
        fields=['id','user','post','body','created','updated']
        extra_kwargs ={'user':{'read_only':True}}


class PostSerializer(ModelSerializer):
    likeCount = SerializerMethodField()
    user = ProfileSerializer() 
    comments=SerializerMethodField()
    class Meta:
        model=Post
        fields=['id','img','caption','likeCount','created','updated','user','comments']
        extra_kwargs ={'user':{'read_only':True}}
    def get_likeCount(self,obj):
        count = obj.like_set.count()
        return count
    def get_comments(self,obj):
        comments=obj.comment_set.all()
        serializer=CommentSerializer(comments,many=True).data
        return serializer
