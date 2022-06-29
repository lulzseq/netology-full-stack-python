from django.shortcuts import render
from articles.models import Article, ArticleScope
from django.db.models.query import Prefetch


def articles_list(request):
    template = 'articles/news.html'

    ordering = '-published_at'
    object_list = Article.objects.order_by(ordering).prefetch_related(
        Prefetch('scopes', ArticleScope.objects.order_by('-is_main', 'tag__name'))
    )
    context = {
        'object_list': object_list
    }

    return render(request, template, context)