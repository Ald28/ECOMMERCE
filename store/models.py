from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre
 
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, related_name='products', on_delete=models.CASCADE)
    stock = models.IntegerField(max_length=100)
    imagen = models.ImageField(upload_to='product_images/', blank=True, null=True) #permiten que este campo pueda estar vacío

    def __str__(self):
        return self.nombre
    
class Usuario(models.Model):
    nombre= models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  #asegura que cada email sea único en la base de datos
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email
