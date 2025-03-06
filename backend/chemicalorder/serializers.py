from rest_framework import serializers

from .models import ChemicalOrder


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChemicalOrder
        fields = [  # noqa: RUF012
            "chemical_name",
            "cas_number",
            "orderer"
        ]
