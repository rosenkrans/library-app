from django.contrib import admin
from .models import Category, Book, Member

# Register your models here.
admin.site.register([Category, Book, Member])
