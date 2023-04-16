from django.db import models

# Create your models here.

class UserInfo(models.Model):
    u_id = models.AutoField(primary_key=True)
    u_name = models.CharField(max_length=50)
    
class RestInfo(models.Model):
    p_id = models.AutoField(primary_key=True)
    p_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    
    
class AttrInfo(models.Model):
    p_id = models.AutoField(primary_key=True)
    p_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)