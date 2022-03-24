
from django.urls import path, include, re_path

from api.apiview import TeamCreateView, TeamDeleteView, TeamView
urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('team', TeamView.as_view(), name='team'),
    path('team/create', TeamCreateView.as_view(), name='team_create'),
    path('team/<int:pk>/delete', TeamDeleteView.as_view(), name='team_delete')



]
