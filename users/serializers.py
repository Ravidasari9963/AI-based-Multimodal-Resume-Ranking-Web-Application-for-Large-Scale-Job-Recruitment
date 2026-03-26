from rest_framework import serializers
from .models import UserRegistrationModel

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegistrationModel
        fields = ['name', 'loginid', 'password', 'mobile', 'email', 'state', 'status']
        extra_kwargs = {
            'password': {'write_only': True},
            'status': {'required': False},
            'state': {'required': False}
        }

    def create(self, validated_data):
        # Set default status if not provided
        if 'status' not in validated_data:
            validated_data['status'] = 'active'
        return super().create(validated_data)
