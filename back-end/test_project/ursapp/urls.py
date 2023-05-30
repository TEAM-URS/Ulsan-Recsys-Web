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
    path('recsys_r2/', views.recsys_r2, name='recsys_r2'),
    path('recsys_a2/', views.recsys_a2, name='recsys_a2'),
    path('cbf2/', views.cbf2, name='cbf2'),
    path('recsys/', views.recsys, name='recsys'),
    path('pull_reviews/', views.pull_reviews, name='pull_reviews'),
]