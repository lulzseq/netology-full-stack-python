from django.shortcuts import render
from .models import Book
from django.core.paginator import Paginator
from .converters import PubDateConverter


def book_detail(request, pub_date):
    all_dates = [PubDateConverter().to_url(book['pub_date']) for book in
                 Book.objects.order_by('pub_date').values('pub_date').distinct()]
    paginator = Paginator(all_dates, 1)
    index = all_dates.index(PubDateConverter().to_url(pub_date))
    page = paginator.get_page(index + 1)

    if page.has_next():
        next_date = all_dates[index + 1]
    else:
        next_date = None

    if page.has_previous():
        previous_date = all_dates[index - 1]
    else:
        previous_date = None
    books = Book.objects.filter(pub_date=pub_date)
    context = {
        'next_date': next_date,
        'previous_date': previous_date,
        'page': page,
        'books': books
    }
    return render(request, 'books/book_list.html', context)


def book_list(request):
    return render(request, 'books/book_list.html', {'books': Book.objects.all().order_by('-pub_date')})
