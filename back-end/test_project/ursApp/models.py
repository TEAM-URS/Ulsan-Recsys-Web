from django.db import models

# Create your models here.

class UserInfo(models.Model):
    u_id = models.AutoField(primary_key=True)
    user = models.CharField(max_length=50)
    
class RestInfo(models.Model):
    i_id = models.AutoField(primary_key=True)
    restaurant = models.CharField(max_length=100)
    
class AttrInfo(models.Model):
    i_id = models.AutoField(primary_key=True)
    attraction = models.CharField(max_length=100)