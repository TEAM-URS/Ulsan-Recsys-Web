from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('recsys/', views.recsys, name='recsys'),
    path('kakaomap/', views.kakaomap, name='kakaomap')
]

