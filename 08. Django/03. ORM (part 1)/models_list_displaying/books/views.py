from django.shortcuts import render
from .models import Book
from datetime import datetime


def book_detail(request, pub_date):
    return render(request, 'books/book_detail.html', {'book_detail': Book.objects.filter(pub_date=pub_date)})


def book_list(request):
    return render(request, 'books/book_list.html', {'book_list': Book.objects.all()})
