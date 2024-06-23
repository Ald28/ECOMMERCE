from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, apellido, password=None):
        if not correo:
            raise ValueError('Los usuarios deben tener un correo electrónico')
        user = self.model(correo=self.normalize_email(correo), nombre=nombre, apellido=apellido)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, nombre, apellido, password):
        user = self.create_user(correo, nombre, apellido, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'apellido']

    def __str__(self):
        return self.correo

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='categoria_images/', blank=True, null=True)

    def __str__(self):
        return self.nombre
 
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, related_name='products', on_delete=models.CASCADE)
    stock = models.IntegerField()
    imagen = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    def esta_disponible(self):
        return self.stock > 0
