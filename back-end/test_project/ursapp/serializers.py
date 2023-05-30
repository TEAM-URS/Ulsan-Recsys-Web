from rest_framework import serializers
from .models import RestInfo, AttrInfo, UserRestReview, UserAttrReview

class RestInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestInfo
        fields = '__all__'

class AttrInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttrInfo
        fields = '__all__'
        
class UserRestReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRestReview
        fields = '__all__'

class UserAttrReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAttrReview
        fields = '__all__'