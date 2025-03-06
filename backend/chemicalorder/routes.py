from .views import ChemicalOrderViewSet


routes = [
    {
     "regex": r"chemicalorder",
     "viewset": ChemicalOrderViewSet,
     "basename":
     "chemical name"
     },
]
