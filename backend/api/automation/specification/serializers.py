from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework import serializers

from ..models import Specification
from .models import Author, Dependency, Error, Input, Output


class InputSerializer(serializers.ModelSerializer):

    class Meta:
        model = Input
        fields = '__all__'


class OutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Output
        fields = '__all__'


class DependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependency
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class ErrorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Error
        fields = '__all__'


class SpecificationSerializer(WritableNestedModelSerializer):
    Inputs = InputSerializer(many=True, read_only=False)
    Outputs = OutputSerializer(many=True, read_only=False)
    Dependencies = DependencySerializer(many=True, read_only=False)
    Authors = AuthorSerializer(many=True, read_only=False)
    Errors = ErrorSerializer(many=True, read_only=False)

    class Meta:
        model = Specification
        fields = ['id', 'Name', 'Description',
                  'Category', 'Version', 'Inputs', 'Outputs',
                  'Dependencies', 'Authors', 'Errors']
        depth = 1
