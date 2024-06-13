from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoSerializer
from .views import register, login_view, product_list

router = DefaultRouter() # Incluye todas las rutas generadas por el router en la ruta raíz
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoSerializer)
 
urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),#Define una ruta para el registro de usuarios en register/, que será manejada por la vista register
    path('login/', login_view, name='login'),
    path('productos/', product_list, name='product_list'), 
]
