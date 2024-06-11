from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers
from .models import Profile
from django.http import JsonResponse


# User serializer class
class UserSerializer(ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id','username','email','password']
        extra_kwargs ={'password':{'write_only':True}}


# Profile serializer class
class ProfileSerializer(ModelSerializer):
    user = UserSerializer()
    followers=SerializerMethodField()
    following=SerializerMethodField()
    posts = SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id','img','bio','user','followers','following','posts']
    def get_followers(self,obj):
        count = obj.following.count()
        return count
    def get_following(self,obj):
        count = obj.followers.count()
        return count
    def get_posts(self,obj):
        count = obj.post_set.count()
        return count
