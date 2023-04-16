from django.contrib import admin
from .models import UserInfo, RestInfo, AttrInfo
# Register your models here.

admin.site.register(UserInfo)
admin.site.register(RestInfo)
admin.site.register(AttrInfo)