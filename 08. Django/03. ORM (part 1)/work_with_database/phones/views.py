from django.http import HttpResponse
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
    return render(request, 'catalog.html', {'phones': context_val})


def show_product(request, slug):
    for p in Phone.objects.all():
        if p.slug == slug:
            context = {
                'phone': {
                    'name': p.name,
                    'image': p.image,
                    'price': p.price,
                    'release_date': p.release_date,
                    'lte_exists': p.lte_exists
                }
            }
    # context = {'phone': Phone.objects.filter(slug=slug)}
    return render(request, 'product.html', context)
