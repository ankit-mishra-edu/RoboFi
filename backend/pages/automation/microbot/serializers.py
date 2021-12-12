from django.core.exceptions import ValidationError
from rest_framework import serializers

from ..models import (Microbot, Specification)

from ..specification.serializers import SpecificationSerializer


class MicrobotSerializer(serializers.ModelSerializer):
    specification = SpecificationSerializer(read_only=True)

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        try:
            specification = Specification.objects.get(
                pk=data.get('specification'))
        except Specification.DoesNotExist:
            raise ValidationError(
                {'specification': ['Invalid specification primary key']},
                code='invalid',
            )
        internal_data['specification'] = specification
        return internal_data

    class Meta:
        model = Microbot
        fields = ['id', 'Name', 'Technology',
                  'Description', 'Version', 'specification', ]
        depth = 1
