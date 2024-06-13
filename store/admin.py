from django.contrib import admin
from .models import Producto, Categoria, Usuario
admin.site.register(Usuario)
admin.site.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria', 'stock', 'imagen') #Especifica las columnas que queremos mostrar en la lista de productos en la interfaz de administración
    list_filter = ('categoria',) #Añade un filtro lateral para que podamos filtrar productos por categoria
    search_fields = ('nombre', 'descripcion') #Añade una barra de búsqueda que permite buscar productos por nombre y descripcion

admin.site.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre', 'descripcion') 