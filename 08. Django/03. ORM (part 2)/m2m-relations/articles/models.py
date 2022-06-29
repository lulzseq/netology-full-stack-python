from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=256, verbose_name='Title')
    text = models.TextField(verbose_name='Text')
    published_at = models.DateTimeField(verbose_name='Publication date')
    image = models.ImageField(null=True, blank=True, verbose_name='Image', )

    class Meta:
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=50)
    article = models.ManyToManyField(Article, through='ArticleScope')

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class ArticleScope(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='scopes')
    is_main = models.BooleanField(default=False)
    extra = 1
