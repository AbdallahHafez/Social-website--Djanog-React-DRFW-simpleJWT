from django.db import models
from authentication.models import Profile

# Post Model
class Post(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    img = models.ImageField(upload_to='posts')
    caption = models.CharField(max_length=200,null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.caption


# Comment Model
class Comment(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    body = models.CharField(max_length=100,null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body


# Like Model        
class Like(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    def __str__(self):
        return self.post.caption



