from django.db import models

# Create your models here.

class UserInfo(models.Model):
    u_id = models.AutoField(primary_key=True)
    u_name = models.CharField(max_length=50)
    
class RestInfo(models.Model):
    p_id = models.AutoField(primary_key=True)
    p_name = models.CharField(max_length=100)
    rating = models.IntegerField(null=True)
    tags = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    url = models.CharField(max_length=100)
    
    
class AttrInfo(models.Model):
    p_id = models.AutoField(primary_key=True)
    p_name = models.CharField(max_length=100)
    rating = models.IntegerField(null=True)
    tags = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    url = models.CharField(max_length=100)
    
class ReviewRestInfo(models.Model):
    r_id = models.AutoField(primary_key=True)
    u_id = models.IntegerField(null=True)
    p_id = models.IntegerField(null=True)
    rating = models.IntegerField(null=True)
    review = models.CharField(max_length=500, blank=True)
    
class ReviewAttrInfo(models.Model):
    r_id = models.AutoField(primary_key=True)
    u_id = models.IntegerField(null=True)
    p_id = models.IntegerField(null=True)
    rating = models.IntegerField(null=True)
    review = models.CharField(max_length=500, blank=True)