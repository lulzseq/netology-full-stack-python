from django.views.generic import ListView
from django.shortcuts import render

from .models import Teacher


def students_list(request):
    template = 'school/students_list.html'
    context = {'object_list': Teacher.objects.all().prefetch_related('students')}

    return render(request, template, context)