from __future__ import unicode_literals

from django.db import models

# Create your models here.
class CourseManager(models.Manager):
    def course_validator(self, postData):
        errors = {}
        if len(postData['name']) <= 5:
            errors['name'] = "Course names need to be more than 5 characters long"
        if len(postData['desc']) <= 15:
            errors['desc'] = "Descriptions should be more than 15 characters long"
        return errors


class Course(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    desc = models.TextField()
    objects = CourseManager()
