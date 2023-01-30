from django.db import models

# Create your models here.

class About(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=200)

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=500)

class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    message = models.CharField(max_length=200)
