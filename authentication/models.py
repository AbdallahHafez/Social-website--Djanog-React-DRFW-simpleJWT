from django.db import models
from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,blank=True,null=True)
    img=models.ImageField(upload_to='media',blank=True,null=True)
    bio=models.TextField(blank=True,null=True)


    def __str__(self):
        return self.user.username


# Following Model
class Follow(models.Model):
    followed = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='following')
    follower=models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='followers')


# #signal from User to Profile, when creation of user instance occurs.
# @receiver(post_save,sender=User)
# def create_profile(sender,instance,created,**kwargs):
#     if created:
#         Profile.objects.create(user=instance)
        
# #signal from User to Profile, when update of user instance occurs.
# @receiver(post_save,sender=User)
# def update_profile(sender,instance,created,**kwargs):
#     if created==False:
#         instance.profile.save()



