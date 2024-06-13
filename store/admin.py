from django.contrib import admin
from .models import Producto, Categoria, Usuario
admin.site.register(Usuario)
admin.site.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria', 'stock', 'imagen')
    list_filter = ('categoria',)
    search_fields = ('nombre', 'descripcion')

admin.site.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre', 'descripcion') 