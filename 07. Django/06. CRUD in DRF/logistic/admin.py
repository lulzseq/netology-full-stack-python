from django.contrib import admin
from .models import Product, Stock, StockProduct


class StockInline(admin.TabularInline):
    model = Stock.products.through
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [StockInline]


class StockProductInline(admin.TabularInline):
    model = StockProduct
    extra = 1


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    inlines = [StockProductInline]
