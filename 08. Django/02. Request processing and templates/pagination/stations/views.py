from django.shortcuts import render, redirect
from django.urls import reverse
from csv import DictReader
from django.core.paginator import Paginator
import os
from django.conf import settings
from pprint import pprint


def index(request):
    return redirect(reverse('bus_stations'))

def bus_stations(request):
    bus_stations = []
    path = os.path.join(settings.BASE_DIR, 'data-398-2018-08-30.csv')
    with open(path, 'r', encoding='utf-8') as file:
        reader = DictReader(file)
        for row in reader:
            bus_stations.append({
                'Name': row['Name'],
                'Street': row['Street'],
                'District': row['District']
            })

    page_number = int(request.GET.get("page", 1))
    paginator = Paginator(bus_stations, 3)
    page = paginator.get_page(page_number)

    context = {
        'bus_stations': bus_stations[:5],
        'page': page,
    }
    return render(request, 'stations/index.html', context)