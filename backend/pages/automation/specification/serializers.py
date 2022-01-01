from rest_framework import serializers

from .models import Author, Dependency, Error, Input, Output
from ..models import Specification


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


class SpecificationSerializer(serializers.ModelSerializer):
    Inputs = InputSerializer(many=True, read_only=False)
    Outputs = OutputSerializer(many=True, read_only=False)
    Dependencies = DependencySerializer(many=True, read_only=False)
    Authors = AuthorSerializer(many=True, read_only=False)
    Errors = ErrorSerializer(many=True, read_only=False)

    class Meta:
        model = Specification
        # fields = '__all__'
        fields = ['id', 'Name', 'Description',
                  'Category', 'Version', 'Inputs', 'Outputs',
                  'Dependencies', 'Authors', 'Errors']
        depth = 1

    def create(self, validated_data: dict):
        inputs = validated_data.pop("Inputs")
        outputs = validated_data.pop("Outputs")
        dependencies = validated_data.pop("Dependencies")
        authors = validated_data.pop("Authors")
        errors = validated_data.pop("Errors")

        specification: Specification = super().create(validated_data)

        specification.Inputs.add(
            *(Input.objects.create(**input).id for input in inputs))

        specification.Outputs.add(
            *(Output.objects.create(**output).id for output in outputs))

        specification.Dependencies.add(
            *(Dependency.objects.create(**dependency).id for dependency in dependencies))

        specification.Authors.add(
            *(Author.objects.create(**author).id for author in authors))

        specification.Errors.add(
            *(Error.objects.create(**error).id for error in errors))

        specification.save()

        return specification
