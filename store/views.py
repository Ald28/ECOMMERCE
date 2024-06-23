from rest_framework import viewsets
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario, Producto, Categoria
from .serializers import UsuarioSerializer, ProductoSerializer, CategoriaSerializer
import json
from django.contrib.auth.hashers import make_password, check_password

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

@csrf_exempt
def registro(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get('correo')
        password = data.get('password')
        
        if Usuario.objects.filter(correo=correo).exists():
            return JsonResponse({'error': 'El email ya existe'}, status=400)
        
        hashed_password = make_password(password)
        user = Usuario.objects.create(nombre=nombre, apellido=apellido, correo=correo, password=hashed_password)
        print(f"Usuario creado con correo: {correo} y hash: {user.password}")
        return JsonResponse({'message': 'Usuario creado'}, status=201)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def iniciar_sesion(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        correo = data.get('correo')
        password = data.get('password')
        
        try:
            user = Usuario.objects.get(correo=correo)
            if check_password(password, user.password):
                return JsonResponse({'message': 'Logeado exitosamente', 'user': user.id}, status=200)
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=400)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    
@csrf_exempt
def listar_productos(request):
    if request.method == 'GET':
        products = Producto.objects.all()
        products_data = [
            {
                "id": product.id,
                "nombre": product.nombre,
                "descripcion": product.descripcion,
                "precio": str(product.precio),  # Convertir DecimalField a string para JSON
                "categoria": product.categoria.id,
                "imagen": product.imagen.url if product.imagen else None
            }
            for product in products
        ]
        return JsonResponse(products_data, safe=False)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    
    
@api_view(['GET'])
def listar_productos_por_categoria(request, categoryId):
    categoria = get_object_or_404(Categoria, id=categoryId)
    productos = Producto.objects.filter(categoria=categoria)
    serializer = ProductoSerializer(productos, many=True)
    data = {
        'categoria': categoria.nombre,
        'productos': serializer.data
    }
    return Response(data)

@api_view(['GET'])
def buscar_productos(request):
    print("Vista buscar_productos alcanzada")  # Log adicional
    query = request.GET.get('query', '')
    print(f"Query: {query}")  # Log para verificar el query recibido
    if query:
        productos = Producto.objects.filter(nombre__icontains=query)
        print(f"Productos encontrados: {productos}")  # Log para verificar los productos encontrados
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    print("No se proporcionó un término de búsqueda")  # Log para verificar si no se proporcionó el término de búsqueda
    return Response({'error': 'No se proporcionó un término de búsqueda'}, status=400)
