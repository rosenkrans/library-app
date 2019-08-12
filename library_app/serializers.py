from rest_framework import serializers

from .models import Category, Book, Member


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'books')

class BookSerializer(serializers.ModelSerializer):
    songs = BookSerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'isbn', 'year_published')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'name', 'phone_number', 'email', 'member_expiration_date')

