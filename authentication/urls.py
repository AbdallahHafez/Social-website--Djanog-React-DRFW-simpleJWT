from django.urls import path
from . import views
urlpatterns = [
    path('create/',views.createUser,name='createUser'),
    path('profile/<str:pk>',views.showUpdateProfile,name='profile'),
    path('follow/',views.following,name='follow'),
    path('profileList/',views.profileList,name='list'),
]
