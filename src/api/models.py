from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Vendedor(db.Model):
    __tablename__ = 'vendedor'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    productos = db.relationship('Producto', backref='vendedor', lazy=True)
    tiendas = db.relationship('Tienda', backref='vendedor', lazy=True)


    def __repr__(self):
        return f'<Vendedor {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Tienda(db.Model):
    __tablename__ = 'tienda'
    id = db.Column(db.Integer, primary_key=True)
    nombre_tienda = db.Column(db.String(120), unique=True, nullable=False)
    descripcion_tienda = db.Column(db.String(500), unique=False)
    categoria_tienda = db.Column(db.String(80), unique=False, nullable=False)
    direccion_tienda = db.Column(db.String(120), unique=False, nullable=False)
    url_imagen_tienda = db.Column(db.String(120), unique=False, nullable=False)
    productos = db.relationship('Producto', backref='tienda', lazy=True)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedor.id'))


    def __repr__(self):
        return f'<Tienda {self.nombre_tienda}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_tienda": self.nombre_tienda,
            "descripcion_tienda": self.descripcion_tienda,   
            "categoria_tienda": self.categoria_tienda, 
            "direccion_tienda": self.direccion_tienda, 
            "url_imagen_tienda": self.url_imagen_tienda,        
            # do not serialize the password, its a security breach
        }  
     
class Producto(db.Model):
    __tablename__ = 'producto'
    id = db.Column(db.Integer, primary_key=True)
    nombre_producto = db.Column(db.String(120), unique=False, nullable=False)
    precio = db.Column(db.Integer, unique=False, nullable=False)
    descripcion_producto = db.Column(db.String(500), unique=False)
    categoria_producto = db.Column(db.String(80), unique=False, nullable=False)
    url_imagen_producto = db.Column(db.String(120), unique=False, nullable=False)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedor.id'))
    tienda_id = db.Column(db.Integer, db.ForeignKey('tienda.id'))


    def __repr__(self):
        return f'<Producto {self.nombre_producto}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_producto": self.nombre_producto,
            "precio": self.precio,
            "descripcion_producto": self.descripcion_producto,   
            "categoria_producto": self.categoria_producto, 
            "url_imagen_producto": self.url_imagen_producto,        
            # do not serialize the password, its a security breach
        } 
    
 