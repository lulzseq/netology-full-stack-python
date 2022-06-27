from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import Phone


def index(request):
    return redirect('catalog')


def show_catalog(request):
    sorting = request.GET.get('sort')
    SORT_MAP = {
        'name': 'name',
        'min_price': 'price',
        'max_price': '-price'
    }
    if sorting:
        context_val = Phone.objects.all().order_by(SORT_MAP[sorting])
    else:
        context_val = Phone.objects.all()
    return render(request, 'catalog.html', {'phones': context_val})


def show_product(request, slug):
    return render(request, 'product.html', {'phone': Phone.objects.filter(slug=slug).first()})
