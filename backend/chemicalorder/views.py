from rest_framework import viewsets

from .models import ChemicalOrder
from .serializers import UserSerializer


class ChemicalOrderViewSet(viewsets.ModelViewSet):
    queryset = ChemicalOrder.objects.all()
    serializer_class = UserSerializer
