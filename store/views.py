from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
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
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)
        
        user = User.objects.create(first_name=first_name, last_name=last_name, email=email, password=password)
        return JsonResponse({'message': 'User created successfully'}, status=201)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = User.objects.get(email=email, password=password)
            return JsonResponse({'message': 'Login successful', 'user': user.id}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
        
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
    