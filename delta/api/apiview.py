from rest_framework import generics
from rest_framework import permissions
from api.serializers import TeamSerializer
from team.models import Team


class TeamView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(created_by=self.request.user)


class TeamCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeamSerializer


class TeamDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(created_by=self.request.user)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
