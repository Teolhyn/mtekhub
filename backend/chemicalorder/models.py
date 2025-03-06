from django.db import models
from common.models import IndexedTimeStampedModel

class ChemicalOrder(IndexedTimeStampedModel):
    chemical_name = models.CharField(max_length=255)
    cas_number = models.CharField(max_length=255)
    orderer = models.CharField(max_length=255)

    def __str__(self):
        return self.chemical_name
