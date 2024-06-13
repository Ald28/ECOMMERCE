from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario
import json

class CategoriaViewSet(viewsets.ModelViewSet): #Esta es una clase especial que maneja cómo mostramos, creamos, actualizamos y borramos categorías
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
 
class ProductoSerializer(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend] #Le decimos que queremos usar la herramienta de filtrado
    filterset_fields = ['categoria'] #Le decimos que queremos usar la herramienta de filtrado

@csrf_exempt #Esto le dice a Django que no necesita verificar un tipo especial de seguridad para esta función
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body) #convierte los datos que enviaron a un formato que Python puede entender
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        email = data.get('email')
        password = data.get('password')
        
        if Usuario.objects.filter(email=email).exists(): #Verifica si ya existe un usuario con ese email
            return JsonResponse({'error': 'El email ya existe'}, status=400)
        
        user = Usuario.objects.create(nombre=nombre, apellido=apellido, email=email, password=password) #Crea un nuevo usuario si el email no existe
        return JsonResponse({'message': 'Usuario creado'}, status=201)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try: #Trata de encontrar al usuario con el email y la contraseña correctos, si no lo encuentra, envía un mensaje de error
            user = Usuario.objects.get(email=email, password=password)
            return JsonResponse({'message': 'Logeado exitosamente', 'user': user.id}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Datos no encontrados'}, status=400)
        
@csrf_exempt
def product_list(request):
    if request.method == 'GET': #Verifica si alguien está pidiendo ver datos
        products = Producto.objects.all()
        products_data = [ #Crea una lista de diccionarios con la información de cada producto
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
        return JsonResponse(products_data, safe=False) #Envía la lista de productos en formato JSON
    