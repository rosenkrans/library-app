from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=400)
    isbn = models.CharField(max_length=255)
    year_published = models.CharField(min_length=4, max_length=4, default='')
    checked_out = models.CharField(max_length=1, default='')
    checked_out_name = models.CharField(max_length=100, default='')
    due_date = models.CharField(max_length=10, default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='books', default='')

    def __str__(self):
        return self.title

class Member(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=14)
    email = models.CharField(max_length=100)
    member_expiration_date = models.CharField(max_length=10)

    def __str__(self):
        return self.name
