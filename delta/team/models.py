from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Team(models.Model):
    STATUS_CHOICES = (('Active', 'Active'), ('Closed', 'Closed'))
    name = models.CharField(max_length=100, null=False)
    company = models.CharField(max_length=100, null=False)
    status = models.CharField(choices=STATUS_CHOICES,
                              max_length=20)
    last_updated = models.DateTimeField(auto_now=True)
    notes = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, default=1)

    def __str_(self):
        return self.name
