from __future__ import unicode_literals

from django.db import models

class User(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

class Book(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    uploader = models.ForeignKey(User, related_name='uploaded_books')
    like_users = models.ManyToManyField(User, related_name='liked_books')
