from rest_framework import serializers
from .models import RestInfo, AttrInfo

class RestInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestInfo
        fields = '__all__'

class AttrInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttrInfo
        fields = '__all__'