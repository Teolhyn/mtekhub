from django.urls import re_path

from . import views


app_name = "common"
urlpatterns = [
    re_path("", views.IndexView.as_view(), name="index"),
    re_path("/about", views.IndexView.as_view(), name="index"),
]
