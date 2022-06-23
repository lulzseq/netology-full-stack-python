from django.shortcuts import render
from .models import Book


def book_view(request):
    for b in Book.objects.all():
        books_view = {
            'name': b.name,
            'author': b.author,
            'pub_date': b.pub_date
        }
    context = {}
    return render(request, 'books/book_view.html', {'books_view': books_view})

def book_list(request):
    return render(request, 'books/book_list.html', {'book_list': Book.objects.all()})
