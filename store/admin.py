from django.contrib import admin
from .models import Producto, Categoria, Usuario

# Configuración del administrador para el modelo Usuario
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'correo')  # Especifica las columnas que queremos mostrar en la lista de usuarios en la interfaz de administración
    search_fields = ('nombre', 'apellido', 'correo')  # Añade una barra de búsqueda que permite buscar usuarios por nombre, apellido y email

admin.site.register(Usuario, UsuarioAdmin)  # Registra el modelo Usuario con la configuración personalizada

# Configuración del administrador para el modelo Producto
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria', 'stock', 'imagen')  # Especifica las columnas que queremos mostrar en la lista de productos en la interfaz de administración
    list_filter = ('categoria',)  # Añade un filtro lateral para que podamos filtrar productos por categoría
    search_fields = ('nombre', 'descripcion')  # Añade una barra de búsqueda que permite buscar productos por nombre y descripción

admin.site.register(Producto, ProductoAdmin)  # Registra el modelo Producto con la configuración personalizada

# Configuración del administrador para el modelo Categoria
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')  # Especifica las columnas que queremos mostrar en la lista de categorías en la interfaz de administración
    search_fields = ('nombre', 'descripcion')  # Añade una barra de búsqueda que permite buscar categorías por nombre y descripción

admin.site.register(Categoria, CategoriaAdmin)  # Registra el modelo Categoria con la configuración personalizada