from django.contrib import admin
from .models import ChemicalOrder

@admin.register(ChemicalOrder)
class CustomChemicalOrderAdmin(admin.ModelAdmin):
    list_display = ("id", "chemical_name", "orderer", "created", "modified")
    search_fields = ("chemical name",)
