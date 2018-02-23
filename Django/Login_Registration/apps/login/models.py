from __future__ import unicode_literals

from django.db import models

class UserManager(models.Manager):
    def user_validator(self, postData):
        errors = {}
        if len(postData['first_name']) < 2:
            errors["first_name"] = "First name should be more than 2 characters"
        if len(postData['last_name']) < 2:
            errors["last_name"] = "Last name should be more than 2 characters"
        return errors

    def try_by_email(self, postData):
        errors = {}
        try:
            tryMe = User.objects.get(email=postData['email']) # existing email?
        except :
            errors["nope"] = "Sorry, that email password combination was not recognized"
            return errors
        if postData['password'] != tryMe.password:
            errors["nope"] = "Sorry, that email password combination was not recognized"
            return errors
        else:
            return tryMe

class User(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    password= models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    objects = UserManager()
