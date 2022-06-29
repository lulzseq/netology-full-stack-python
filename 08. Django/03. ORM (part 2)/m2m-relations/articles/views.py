from django.shortcuts import render
from articles.models import Article, ArticleScope, Tag
from django.db.models.query import Prefetch


def articles_list(request):
    tag = request.GET.get('tag')
    tag_list = Tag.objects.all().order_by('name')

    if tag:
        object_list = Article.objects.filter(tag=tag).order_by('-published_at').prefetch_related(
            Prefetch('scopes', ArticleScope.objects.order_by('-is_main', 'tag__name')))
    else:
        object_list = Article.objects.order_by('-published_at').prefetch_related(
            Prefetch('scopes', ArticleScope.objects.order_by('-is_main', 'tag__name')))

    context = {
        'object_list': object_list,
        'tag_list': tag_list
    }

    return render(request, 'articles/news.html', context)
