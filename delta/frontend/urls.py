from django.urls import path, re_path
from frontend.views import index
urlpatterns = [
    re_path(r'^.*/$', index)]
