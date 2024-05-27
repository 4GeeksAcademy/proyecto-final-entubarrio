"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Vendedor, Producto, Tienda, Particular, FavoritosTiendas, FavoritosProductos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Handle/serialize errors like a JSON object
@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints--------------------------------------------------------------------------------
@api.route('/')
def sitemap():
    return generate_sitemap(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# LOGIN-------------------------------------------------------------------------------------------------------------------
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)

#     vendedor_exist = Vendedor.query.filter_by(email=email).first()
#     print(vendedor_exist)

#     if vendedor_exist is None:
#         return jsonify({"msg": "Email doesn't exist"}), 404

#     if email != vendedor_exist.email or password != vendedor_exist.password:
#         return jsonify({"msg": "Bad username or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token), 200

# SIGNUP-------------------------------------------------------------------------------------------------------------------
# @api.route("/signup", methods=["POST"])
# def signup():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)

    
#     vendedor_exist = Vendedor.query.filter_by(email=email).first()
#     if vendedor_exist is None:
#         new_vendedor = Vendedor(
#             email=email,
#             password=password
#         )
#         db.session.add(new_vendedor)
#         db.session.commit()
#         access_token = create_access_token(identity=email)
#         return jsonify(access_token=access_token), 200

#     else:
#         return jsonify({"msg": "Vendedor existe"}), 400
    
# -------------------------------------------------ENPOINTS BASE DE DATOS------------------------------------------------------
# Endpoint (Todas las tiendas)-------------------------------------------------------------------------------------------------
@api.route('/tiendas', methods=['GET'])
def get_all_tiendas():

    query_results = Tienda.query.all()
    results = list(map(lambda item: item.serialize(), query_results))
    # print(results)
    if results == []:
        return jsonify({"msg":"Empty"}), 404

    response_body = {
        "msg": "Ok",
        "result": results
    }

    return jsonify(response_body), 200

#Endpoint Get one Tienda-------------------------------------------------------------------------------------------------
@api.route('/tienda/<int:tienda_id>', methods=['GET'])
def get_one_tienda(tienda_id):
    # this is how you can use the Family datastructure by calling its methods
    tienda = Tienda.query.get(tienda_id)
    if tienda is None:
        return jsonify({"msg": "No existe la tienda"}), 404
    return jsonify(tienda.serialize()), 200

# #Endpoint Get todos los productos de una tienda-------------------------------------------------------------------------------------------------
@api.route('/productos/<int:tienda_id>', methods=['GET'])
def obtener_productos_tienda(tienda_id):
    # Buscar la tienda por su ID
    tienda = Tienda.query.get(tienda_id)

    # Si la tienda no existe, devolver un error 404
    if tienda is None:
        return jsonify({"msg": "Tienda no encontrada"}), 404
    # Obtener todos los productos de la tienda
    productos = tienda.productos
    # Serializar los productos a JSON
    productos_serializados = [producto.serialize() for producto in productos]

    # Devolver la lista de productos serializados
    return jsonify({'productos': productos_serializados}), 200

# #Enpoint POST añadir una Nueva Tienda-----------------------------------------------------------------------------------
@api.route("/tienda", methods=["POST"]) # ¿es necesario poner el id del vendedor?
@jwt_required()
def create_new_tienda():

    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id

    nombre_tienda = request.json.get("nombre_tienda", None)
    descripcion_tienda = request.json.get("descripcion_tienda", None)
    categoria_tienda = request.json.get("categoria_tienda", None)
    direccion_tienda = request.json.get("direccion_tienda", None)
    url_imagen_tienda = request.json.get("url_imagen_tienda", None)
    
    tienda_exist = Tienda.query.filter_by(nombre_tienda=nombre_tienda).first()

    # poner error si el nombre ya existe
    if tienda_exist is None:
        new_tienda = Tienda(
            nombre_tienda=nombre_tienda,
            descripcion_tienda=descripcion_tienda,
            categoria_tienda=categoria_tienda,
            direccion_tienda=direccion_tienda,
            url_imagen_tienda=url_imagen_tienda,
            vendedor_id=vendedor_id           # es necesario el id para asignar la tienda
        )
        db.session.add(new_tienda)
        db.session.commit()
        return jsonify({"msg": "Tienda creada correctamente"}), 200

    else:
        return jsonify({"error": "La tienda ya existe"}), 400
    
# Enpoint DELETE eliminar una Nueva Tienda-----------------------------------------------------------------------------------
@api.route('/tienda/<string:nombre_tienda>', methods=['DELETE'])
@jwt_required()
def delete_tienda(nombre_tienda):
    
    # Esta variable reemplaza los giones por espacios si los hubiera a la hora de elegir el nombre a eliminar
    nombre_tienda_sin_guiones = nombre_tienda.replace('-', ' ')

    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id

    tienda_exist = Tienda.query.filter_by(nombre_tienda=nombre_tienda_sin_guiones).first()
    
    if tienda_exist is None:
        return jsonify({"msg":"La tienda no existe"}), 404
    else:
        del_tienda = Tienda.query.filter_by(nombre_tienda=nombre_tienda_sin_guiones, vendedor_id=vendedor_id).first()
        # with db.session() as session:
        if del_tienda:
            db.session.delete(del_tienda)
            db.session.commit()
            return jsonify({"msg":"Tienda eliminada"}), 200
        else:
            return jsonify({"msg":"La tienda no existe"}), 404
          
# #Enpoint PUT editar una Tienda-----------------------------------------------------------------------------------
@api.route("/tienda/<string:nombre_tienda>", methods=["PUT"]) # ¿es necesario poner el id del vendedor?

@jwt_required()
def edit_tienda(nombre_tienda):

    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id

    nombre_tienda = request.json.get("nombre_tienda")
    descripcion_tienda = request.json.get("descripcion_tienda")
    categoria_tienda = request.json.get("categoria_tienda")
    direccion_tienda = request.json.get("direccion_tienda")
    url_imagen_tienda = request.json.get("url_imagen_tienda")
    
    tienda_exist = Tienda.query.filter_by(nombre_tienda=nombre_tienda, vendedor_id=vendedor_id).first()

    # poner error si el nombre ya existe
    if tienda_exist is None:
        return jsonify({"msg": "La tienda con el nombre especificado no existe"}), 404
    else:
        tienda_exist.nombre_tienda=nombre_tienda,
        tienda_exist.descripcion_tienda=descripcion_tienda,
        tienda_exist.categoria_tienda=categoria_tienda,
        tienda_exist.direccion_tienda=direccion_tienda,
        tienda_exist.url_imagen_tienda=url_imagen_tienda
        
        db.session.commit()
        return jsonify({"msg": "Tienda editada correctamente"}), 200
      
# #Enpoints PRODUCTOS-----------------------------------------------------------------------------------
@api.route('/productos', methods=['GET'])
def get_all_productos():

    query_results = Producto.query.all()
    results = list(map(lambda item: item.serialize(), query_results))
   
    if results == []:
        return jsonify({"msg" : "No hay productos"}), 404
    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "results": results
    }
    return jsonify(response_body), 200

@api.route('/producto/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):

    producto = Producto.query.get(producto_id)
   
    if producto == None:
        return jsonify({"msg" : "El producto no existe"}), 404

    return jsonify(producto.serialize()), 200

@api.route('/details-producto/<int:tienda_id>/<int:id>', methods=['GET'])
def get_producto_tienda(tienda_id, id):

    check_tienda_producto = Producto.query.filter_by(tienda_id=tienda_id, id=id).first()

    if check_tienda_producto is None:
        return jsonify({"msg" : "No existe este producto"}), 400

    else:
        db.session.get(check_tienda_producto)
        db.session.commit()
        return jsonify(check_tienda_producto.serialize()), 200
    
# #Enpoint POST añadir un Nuevo Producto-----------------------------------------------------------------------------------
@api.route("/producto", methods=["POST"]) # ¿es necesario poner el id del vendedor?
@jwt_required()
def create_new_producto():
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    # Seleciono la tienda porque un vendedor puede tener varias
    tienda = Tienda.query.filter_by(vendedor_id=vendedor_id).first()
    tienda_id=tienda.id
    nombre_producto = request.json.get("nombre_producto", None)
    descripcion_producto = request.json.get("descripcion_producto", None)
    categoria_producto = request.json.get("categoria_producto", None)
    precio = request.json.get("precio", None)
    url_imagen_producto = request.json.get("url_imagen_producto", None)
    producto_exist = Producto.query.filter_by(nombre_producto=nombre_producto, tienda_id=tienda_id).first()
    # poner error si el nombre ya existe
    if producto_exist is None:
        new_producto = Producto(
            nombre_producto=nombre_producto,
            descripcion_producto=descripcion_producto,
            categoria_producto=categoria_producto,
            precio=precio,
            url_imagen_producto=url_imagen_producto,
            vendedor_id=vendedor_id,           # es necesario el id para asignar la tienda
            tienda_id=tienda_id           # es necesario el id para asignar el producto a la tienda
        )
        db.session.add(new_producto)
        db.session.commit()
        return jsonify({"msg": "Producto creado correctamente"}), 200
    else:
        return jsonify({"msg": "El producto ya existe"}), 400

  
# #Enpoint PUT editar un Producto-----------------------------------------------------------------------------------
@api.route("/producto/<int:producto_id>", methods=["PUT"])
@jwt_required()
def update_producto(producto_id):
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    # # Seleciono la tienda porque un vendedor puede tener varias
    # tienda = Tienda.query.filter_by(vendedor_id=vendedor_id).first()
    # tienda_id=tienda.id
    nombre_update = request.json.get("nombre_producto")
    descripcion_update = request.json.get("descripcion_producto")
    categoria_update = request.json.get("categoria_producto")
    precio_update = request.json.get("precio")
    url_imagen_update = request.json.get("url_imagen_producto")
    producto_exist = Producto.query.filter_by(id=producto_id, vendedor_id=vendedor_id).first()
    # poner error si el nombre ya existe
    if producto_exist is None:
        return jsonify({"msg": "El producto no existe"}), 400
    else:
        producto_exist.nombre_producto=nombre_update,
        producto_exist.descripcion_producto=descripcion_update,
        producto_exist.categoria_producto=categoria_update,
        producto_exist.precio=precio_update,
        producto_exist.url_imagen_producto=url_imagen_update
        db.session.commit()
        return jsonify({"msg": "Producto actualizado correctamente"}), 200
# #Enpoint DELETE eliminar un Producto-----------------------------------------------------------------------------------
@api.route('/producto/<int:producto_id>', methods=['DELETE'])
@jwt_required()
def delete_producto(producto_id):
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    # Seleciono la tienda porque un vendedor puede tener varias
    tienda = Tienda.query.filter_by(vendedor_id=vendedor_id).first()
    tienda_id=tienda.id
    check_producto = Producto.query.filter_by(id=producto_id, tienda_id=tienda_id, vendedor_id=vendedor_id).first()
    if check_producto is None:
        return jsonify({"msg" : "El producto no existe en esta tienda"}), 404
    else:
        db.session.delete(check_producto)
        db.session.commit()
        return jsonify({"msg" : "Producto eliminado de la tienda"}), 200

# Endpoint (Todas los vendedores)-------------------------------------------------------------------------------------------------
@api.route('/vendedores', methods=['GET'])
def get_all_vendedores():

    query_results = Vendedor.query.all()
    results = list(map(lambda item: item.serialize(), query_results))
    # print(results)
    if results == []:
        return jsonify({"msg":"Empty"}), 404

    response_body = {
        "msg": "Ok",
        "result": results
    }

    return jsonify(response_body), 200

# #Enpoints Categorias Productos-----------------------------------------------------------------------------------
@api.route('/categorias-productos', methods=['GET'])
def get_all_categorias_productos():

    query_results = Producto.query.all()
    categorias = set()
    for producto in query_results:
        categorias.add(producto.categoria_producto)

    categorias_lista = list(categorias)
   
    if categorias_lista == []:
        return jsonify({"msg" : "No hay productos"}), 404
    response_body = {
        "results": categorias_lista
    }
    return jsonify(response_body), 200

#Endpoint Get Tienda Vendedor-------------------------------------------------------------------------------------------------
@api.route('/tienda', methods=['GET'])
@jwt_required()
def get_vendedor_tienda():
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    # Seleciono la tienda porque un vendedor puede tener varias
    tienda = Tienda.query.filter_by(vendedor_id=vendedor_id).first()
    # tienda_id=tienda.id
    # tienda = Tienda.query.get(tienda_id)
    if tienda is None:
        return jsonify({"msg": "No existe la tienda"}), 404
    return jsonify(tienda.serialize()), 200

#Endpoint Get Productos Vendedor-------------------------------------------------------------------------------------------------
@api.route('/productos-vendedor', methods=['GET'])
@jwt_required()
def get_productos_vendedor():
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    # Seleciono la tienda porque un vendedor puede tener varias
    tienda = Tienda.query.filter_by(vendedor_id=vendedor_id).first()
    # tienda_id=tienda.id

    # tienda = Tienda.query.get(tienda_id)

    # Si la tienda no existe, devolver un error 404
    if tienda is None:
        return jsonify({"msg": "Tienda no encontrada"}), 404
    # Obtener todos los productos de la tienda
    productos = tienda.productos
    # Serializar los productos a JSON
    productos_serializados = [producto.serialize() for producto in productos]

    # Devolver la lista de productos serializados
    return jsonify({'productos': productos_serializados}), 200

# #Enpoints Categorias tiendas-----------------------------------------------------------------------------------
@api.route('/categorias-tiendas', methods=['GET'])
def get_all_categorias_tiendas():

    query_results = Tienda.query.all()
    categorias = set()
    for tienda in query_results:
        categorias.add(tienda.categoria_tienda)

    categorias_lista = list(categorias)
   
    if categorias_lista == []:
        return jsonify({"msg" : "No hay categorias guardadas"}), 404
    response_body = {
        "results": categorias_lista
    }
    return jsonify(response_body), 200

# SIGNUP por Tipo de Usuario-------------------------------------------------------------------------------------------------------------------
@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    tipo_usuario = request.json.get("tipo_usuario", None)

    if not email or not password:
        return jsonify({"msg": "Faltan datos de acceso"}), 400
        
    if tipo_usuario == 'vendedor':
        # Crear un nuevo registro en la tabla de vendedores
        vendedor_exist = Vendedor.query.filter_by(email=email).first()
        if vendedor_exist is None:
            new_vendedor = Vendedor(email=email, password=password)
            db.session.add(new_vendedor)
        else:
            return jsonify({"msg": "Tipo de usuario invalido o ya existe"}), 400
    elif tipo_usuario == 'particular':
        # Crear un nuevo registro en la tabla de particulares
        particular_exist = Particular.query.filter_by(email=email).first()
        if particular_exist is None:
            new_particular = Particular(email=email, password=password)
            db.session.add(new_particular)
        else:
            return jsonify({"msg": "Tipo de usuario invalido o ya existe"}), 400
    
    db.session.commit()
    return jsonify({"msg": "Usuario registrado correctamente"}), 201


# LOGIN con Tipo de Usuario-------------------------------------------------------------------------------------------------------------------
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    tipo_usuario = request.json.get("tipo_usuario")
    
    if not email or not password:
        return jsonify({"msg": "Faltan datos de acceso"}), 400

    if tipo_usuario == 'particular':
            particular_exist = Particular.query.filter_by(email=email, password=password).first()
            if particular_exist is None:
                return jsonify({"msg": "Email no existe o tipo de usuario incorrecto"}), 401
            
            # Si existe se el envia el acceso al particular y crea el token
            access_token = create_access_token(identity=email)
            return jsonify({"msg": "Este Usuario ya tiene un perfil particular", "access_token":access_token, "particular":particular_exist.serialize()}), 201
    
    if tipo_usuario == 'vendedor':
            vendedor_exist = Vendedor.query.filter_by(email=email, password=password).first()
            print(vendedor_exist)
            if vendedor_exist is None:
                return jsonify({"msg": "El vendedor no existe"}), 404
            access_token = create_access_token(identity=email)
            return jsonify({"msg": "Este Vendedor ya tiene un perfil empresa", "access_token":access_token, "vendedor":vendedor_exist.serialize()}), 201
    
# #Enpoints Categorias Productos Tienda-----------------------------------------------------------------------------------
@api.route('/categorias-productos-tienda/<int:tienda_id>', methods=['GET'])
def get_categorias_productos_tienda(tienda_id):
    productos = Producto.query.filter_by(tienda_id=tienda_id)
    categorias = set()
    for producto in productos:
        categorias.add(producto.categoria_producto)

    categorias_lista = list(categorias)
   
    if categorias_lista == []:
        return jsonify({"msg" : "No hay categorias guardadas"}), 404
    response_body = {
        "results": categorias_lista
    }
    return jsonify(response_body), 200

 #Endpoint POST Productos Favoritos-------------------------------------------------------------------------------------------------
@api.route("/productos-favoritos/<int:producto_id>", methods=["POST"]) 
@jwt_required()
def add_producto_favorito(producto_id):
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id


    favorito_exist = FavoritosProductos.query.filter_by(producto_id=producto_id, particular_id=particular_id).first()
    # poner error si el nombre ya existe
    if favorito_exist is None:
        new_favorito = FavoritosProductos(
            producto_id=producto_id,           # es necesario el id para asignar el producto
            particular_id=particular_id          # es necesario el id para asignar el favorito al particular
        )
        db.session.add(new_favorito)
        db.session.commit()
        return jsonify({"msg": "Producto añadido como favorito"}), 200
    else:
        return jsonify({"msg": "El producto ya es un favorito"}), 400
    
    #Endpoint Get Productos Favoritos-------------------------------------------------------------------------------------------------
@api.route('/productos-favoritos', methods=['GET'])
@jwt_required()
def get_productos_favoritos():
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id
    # Seleciono el particular porque hay muchos productos favoritos
    productos_favoritos = FavoritosProductos.query.filter_by(particular_id=particular_id)

    # Si la tienda no existe, devolver un error 404
    if productos_favoritos is None:
        return jsonify({"msg": "Favoritos no encontrados"}), 404
    # Serializar los productos a JSON
    productos_serializados = [{**producto.serialize(), 'isFavorito': True} for producto in productos_favoritos]

    # Devolver la lista de productos serializados
    return jsonify({'productos': productos_serializados}), 200

# #Enpoint DELETE eliminar un Producto Favorito-----------------------------------------------------------------------------------
@api.route('/productos-favoritos/<int:producto_id>', methods=['DELETE'])
@jwt_required()
def delete_producto_favorito(producto_id):
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id
    print(producto_id)
    # Seleciono la tienda porque un vendedor puede tener varias
    check_producto_favorito = FavoritosProductos.query.filter_by(producto_id=producto_id, particular_id=particular_id).first()
    if check_producto_favorito is None:
        return jsonify({"msg" : "El producto no es un favorito"}), 404
    else:
        db.session.delete(check_producto_favorito)
        db.session.commit()
        return jsonify({"msg" : "Producto eliminado de favoritos"}), 200
    
#Endpoint POST Tiendas Favoritas-------------------------------------------------------------------------------------------------
@api.route("/tiendas-favoritas/<int:tienda_id>", methods=["POST"]) 
@jwt_required()
def add_tienda_favorita(tienda_id):
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id


    favorita_exist = FavoritosTiendas.query.filter_by(tienda_id=tienda_id, particular_id=particular_id).first()
    # poner error si el nombre ya existe
    if favorita_exist is None:
        new_favorito = FavoritosTiendas(
            tienda_id=tienda_id,           # es necesario el id para asignar el producto
            particular_id=particular_id          # es necesario el id para asignar el favorito al particular
        )
        db.session.add(new_favorito)
        db.session.commit()
        return jsonify({"msg": "Tienda añadida como favorita"}), 200
    else:
        return jsonify({"msg": "La tienda ya es una favorita"}), 400

#Endpoint Get Tiendas Favoritas-------------------------------------------------------------------------------------------------
@api.route('/tiendas-favoritas', methods=['GET'])
@jwt_required()
def get_tiendas_favoritas():
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id
    # Seleciono el particular porque hay muchos productos favoritos
    tiendas_favoritas = FavoritosTiendas.query.filter_by(particular_id=particular_id)


    # Si la tienda no existe, devolver un error 404
    if tiendas_favoritas is None:
        return jsonify({"msg": "Favoritas no encontradas"}), 404
    # Serializar los productos a JSON
    productos_serializados = [{**producto.serialize(), 'isFavorito': True} for producto in tiendas_favoritas]

    # Devolver la lista de productos serializados
    return jsonify({'tiendas': productos_serializados}), 200

# #Enpoint DELETE eliminar una Tienda Favorita-----------------------------------------------------------------------------------
@api.route('/tiendas-favoritas/<int:tienda_id>', methods=['DELETE'])
@jwt_required()
def delete_tienda_favorita(tienda_id):
    email = get_jwt_identity()
    particular = Particular.query.filter_by(email=email).first()
    particular_id=particular.id
    # Seleciono la tienda porque un vendedor puede tener varias
    check_tienda_favorita = FavoritosTiendas.query.filter_by(tienda_id=tienda_id, particular_id=particular_id).first()
    if check_tienda_favorita is None:
        return jsonify({"msg" : "La tienda no es una favorita"}), 404
    else:
        db.session.delete(check_tienda_favorita)
        db.session.commit()
        return jsonify({"msg" : "Tienda eliminada de favoritas"}), 200
    