from django.contrib import admin
from .models import Producto, Categoria

@admin.register(Producto)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria', 'stock', 'imagen')
    list_filter = ('categoria',)
    search_fields = ('nombre', 'descripcion')

@admin.register(Categoria)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre', 'descripcion') 