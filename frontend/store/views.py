from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, User
from .serializers import CategorySerializer, ProductSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

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
        products = Product.objects.all()
        products_data = [
            {
                "id": product.id, 
                "name": product.name, 
                "description": product.description, 
                "price": product.price,
                "category": product.category.id,
                "image": product.image.url if product.image else None
            } 
            for product in products
        ]
        return JsonResponse(products_data, safe=False)

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data.get('product_id')

        try:
            product = Product.objects.get(id=product_id)
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': product.name,
                        },
                        'unit_amount': int(product.price * 100),  # El precio en centavos
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=settings.FRONTEND_URL + '/success',
                cancel_url=settings.FRONTEND_URL + '/cancel',
            )
            return JsonResponse({'id': checkout_session.id})
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product does not exist'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
