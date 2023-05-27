from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('recsys_a/', views.recsys_a, name='recsys_a'),
    path('recsys_r/', views.recsys_r, name='recsys_r'),
    path('kakaomap/', views.kakaomap, name='kakaomap'),    
    path('questionnaire_r/', views.quesionnaire_r, name='questionnaire_r'),
    path('questionnaire_a/', views.questionnaire_a, name='questionnaire_a'),
    path('cbf/', views.cbf, name='cbf'),
    path('review/', views.review, name='review'),
]

