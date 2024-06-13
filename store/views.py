from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario
import json

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
 
class ProductoSerializer(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categoria']

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        email = data.get('email')
        password = data.get('password')
        
        if Usuario.objects.filter(email=email).exists():
            return JsonResponse({'error': 'El email ya existe'}, status=400)
        
        user = Usuario.objects.create(nombre=nombre, apellido=apellido, email=email, password=password)
        return JsonResponse({'message': 'Usuario creado'}, status=201)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = Usuario.objects.get(email=email, password=password)
            return JsonResponse({'message': 'Logeado exitosamente', 'user': user.id}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Datos incorrectos'}, status=400)
        
@csrf_exempt
def product_list(request):
    if request.method == 'GET':
        products = Producto.objects.all()
        products_data = [
            {
                "id": product.id, 
                "name": product.nombre, 
                "description": product.descripcion, 
                "price": product.precio,
                "category": product.categoria.id,
                "image": product.imagen.url if product.imagen else None
            } 
            for product in products
        ]
        return JsonResponse(products_data, safe=False)
    