from django.shortcuts import render, redirect
from .models import Phone


def index(request):
    return redirect('catalog')


def show_catalog(request):
    sorting = request.GET.get('sort')
    if sorting == 'name':
        context_val = Phone.objects.all().order_by('name')
    elif sorting == 'min_price':
        context_val = Phone.objects.all().order_by('price')
    elif sorting == 'max_price':
        context_val = Phone.objects.all().order_by('-price')
    else:
        context_val = Phone.objects.all()
    context = {
        'phones': context_val
    }
    return render(request, 'catalog.html', context)


def show_product(request, slug):
    # phones = Phone.objects.all()
    # product_detail = request.GET.get(slug)
    # for i in product_detail:
    #
    context = {}
    return render(request, 'product.html', context)
