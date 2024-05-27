from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_migrate import migrate


db = SQLAlchemy()

class Vendedor(db.Model):
    __tablename__ = 'vendedor'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    productos = db.relationship('Producto', backref='vendedor', lazy=True)
    tiendas = db.relationship('Tienda', backref='vendedor', lazy=True, cascade="all, delete")


    def __repr__(self):
        return f'<Vendedor {self.email}>'

    def serialize(self):
        tiendas = list(map(lambda item: item.serialize(), self.tiendas))
        return {
            "id": self.id,
            "email": self.email,
            "tiendas": True if len(tiendas) > 0  else False
            # do not serialize the password, its a security breach
        }
    
class Tienda(db.Model):
    __tablename__ = 'tienda'
    id = db.Column(db.Integer, primary_key=True)
    nombre_tienda = db.Column(db.String(120), unique=True, nullable=False)
    descripcion_tienda = db.Column(db.String(500), unique=False)
    categoria_tienda = db.Column(db.String(80), unique=False, nullable=False)
    direccion_tienda = db.Column(db.String(120), unique=False, nullable=False)
    url_imagen_tienda = db.Column(db.String(800), unique=False, nullable=False)
    productos = db.relationship('Producto', backref='tienda', lazy=True, cascade="all, delete")
    vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedor.id'))
    favoritos = db.relationship('FavoritosTiendas', backref='tienda', lazy=True, cascade="all, delete")

    # particular_id = db.Column(db.Integer, db.ForeignKey('particular.id'))

    def __repr__(self):
        return f'<Tienda {self.nombre_tienda}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_tienda": self.nombre_tienda,
            "descripcion_tienda": self.descripcion_tienda,   
            "categoria_tienda": self.categoria_tienda, 
            "direccion_tienda": self.direccion_tienda, 
            "url_imagen_tienda": self.url_imagen_tienda        
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
    favoritos_productos = db.relationship('FavoritosProductos', backref='producto', lazy=True, cascade="all, delete")
    vendedor_id = db.Column(db.Integer, db.ForeignKey('vendedor.id'))
    tienda_id = db.Column(db.Integer, db.ForeignKey('tienda.id'))
    particular_id = db.Column(db.Integer, db.ForeignKey('particular.id'))

    # tienda = db.relationship('Tienda', backref='productos')

    def __repr__(self):
        return f'<Producto {self.nombre_producto}>'

    def serialize(self):
        result= Tienda.query.filter_by(id=self.tienda_id).first()
        return {
            "id": self.id,
            "nombre_producto": self.nombre_producto,
            "precio": self.precio,
            "nombre_tienda": result.serialize()["nombre_tienda"],
            "descripcion_producto": self.descripcion_producto,   
            "categoria_producto": self.categoria_producto, 
            "url_imagen_producto": self.url_imagen_producto,   
            "tienda_id": self.tienda_id        
            # do not serialize the password, its a security breach
        } 
    
class Particular(db.Model):
    __tablename__ = 'particular'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    favoritos_productos = db.relationship('FavoritosProductos', backref='particular', lazy=True)
    favoritos_tiendas = db.relationship('FavoritosTiendas', backref='particular', lazy=True)

    # productos = db.relationship('Producto', backref='particular', lazy=True)
    # tiendas = db.relationship('Tienda', backref='particular', lazy=True)
    # Otros campos que quieras agregar para usuarios particulares

    def __repr__(self):
        return f'<Particular {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class FavoritosProductos(db.Model):
    __tablename__ = 'favoritos_productos'
    id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))
    particular_id = db.Column(db.Integer, db.ForeignKey('particular.id'))

    # tienda = db.relationship('Tienda', backref='productos')

    def __repr__(self):
        return f'<FavoritosProductos {self.id}>'

    def serialize(self):
        result= Producto.query.filter_by(id=self.producto_id).first()

        return {
            "id": self.id,
            "nombre_producto": result.serialize()["nombre_producto"], 
            "precio": result.serialize()["precio"], 
            "descripcion_producto": result.serialize()["descripcion_producto"], 
            "categoria_producto": result.serialize()["categoria_producto"], 
            "url_imagen_producto": result.serialize()["url_imagen_producto"], 
            "nombre_tienda": result.serialize()["nombre_tienda"], 
            "producto_id": self.producto_id,
            # "particular_id": self.particular_id      
    
      
            # do not serialize the password, its a security breach
        } 
    
class FavoritosTiendas(db.Model):
    __tablename__ = 'favoritos_tiendas'
    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tienda.id'))
    particular_id = db.Column(db.Integer, db.ForeignKey('particular.id'))

    # tienda = db.relationship('Tienda', backref='productos')

    def __repr__(self):
        return f'<FavoritosTiendas {self.id}>'

    def serialize(self):
        result= Tienda.query.filter_by(id=self.tienda_id).first()

        return {
            "id": self.id,
            "nombre_tienda": result.serialize()["nombre_tienda"],
            "categoria_tienda": result.serialize()["categoria_tienda"],
            "direccion_tienda": result.serialize()["direccion_tienda"],
            "url_imagen_tienda": result.serialize()["url_imagen_tienda"],
            "descripcion_tienda": result.serialize()["descripcion_tienda"],
            "tienda_id": self.tienda_id,
            "particular_id": self.particular_id      

            # do not serialize the password, its a security breach
        } 