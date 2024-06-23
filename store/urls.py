from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, UsuarioViewSet, registro, iniciar_sesion, listar_productos, listar_productos_por_categoria, buscar_productos

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('registro/', registro, name='registro'),
    path('iniciar_sesion/', iniciar_sesion, name='iniciar_sesion'),
    path('productos/', listar_productos, name='listar_productos'),
    path('categorias/<int:categoryId>/productos/', listar_productos_por_categoria, name='listar_productos_por_categoria'),
    path('buscar_productos/', buscar_productos, name='buscar_productos'),  # URL alternativa
    path('productos/<int:productId>/', ProductoViewSet.as_view({'get': 'retrieve'}), name='detalle_producto'),
]