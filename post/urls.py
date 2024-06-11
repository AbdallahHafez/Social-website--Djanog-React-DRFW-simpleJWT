from django.urls import path
from .import views
urlpatterns = [
    path('list/',views.createListPost,name='post'),
    path('single/<str:pk>/',views.postUpdateDelete,name='post'),
    path('comments/<str:pk>',views.listcreateComment,name='comment'),
    path('comment/<str:pk>/',views.updateDeleteComment,name='single comment'),
    path('generalUserPosts/<str:pk>/',views.getGeneralUserPosts,name='getGeneralUserPosts'),
    path('userPosts/',views.getUserPosts,name='userPosts'),
    path('like/',views.like,name='like')

]