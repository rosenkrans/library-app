from django.shortcuts import render
from rest_framework import viewsets

from .serializers import CategorySerializer, BookSerializer, MemberSerializer
from .models import Category, Book, Member


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class MemberView(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

