"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Vendedor, Producto, Tienda
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
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    vendedor_exist = Vendedor.query.filter_by(email=email).first()
    print(vendedor_exist)

    if vendedor_exist is None:
        return jsonify({"msg": "Email doesn't exist"}), 404

    if email != vendedor_exist.email or password != vendedor_exist.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# SIGNUP-------------------------------------------------------------------------------------------------------------------
@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    
    vendedor_exist = Vendedor.query.filter_by(email=email).first()
    if vendedor_exist is None:
        new_vendedor = Vendedor(
            email=email,
            password=password
        )
        db.session.add(new_vendedor)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200

    else:
        return jsonify({"msg": "Vendedor existe"}), 400
    
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
        return jsonify({"msg": "No existe el personaje"}), 404
    return jsonify(tienda.serialize()), 200

# #Endpoint Get de una tienda un producto-------------------------------------------------------------------------------------------------
# @api.route('/details-tienda/<int:tienda_id>/<int:producto_id>', methods=['GET'])
# def get_one_tienda_one_producto(tienda_id, producto_id):
#     # this is how you can use the Family datastructure by calling its methods
#     # tienda = Tienda.query.get(tienda_id)
#     # producto = Producto.query.get(producto_id)
#     check_tienda_producto = Tienda.query.filter_by(id=tienda_id, productos=producto_id, ).first()  

#     if check_tienda_producto is None:
#         return jsonify({"msg": "No existe la tienda"}), 404
#     # elif producto is None:
#     #     return jsonify({"msg": "No existe el producto en esta tienda"}), 404
#     else:
#         db.session.get(check_tienda_producto)
#         db.session.commit()
#         return jsonify(check_tienda_producto.serialize()), 200

# #Endpoint Get de una tienda un producto-------------------------------------------------------------------------------------------------   
# @api.route('/details-producto/<int:tienda_id>/<int:id>', methods=['GET'])
# def get_producto_tienda(tienda_id, id):

#     check_tienda_producto = Producto.query.filter_by(tienda_id=tienda_id, id=id).first()

#     if check_tienda_producto is None:
#         return jsonify({"msg" : "No existe este producto"}), 400

#     else:
#         db.session.get(check_tienda_producto)
#         db.session.commit()
#         return jsonify(check_tienda_producto.serialize()), 200

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
        return jsonify({"msg": "La tienda ya existe"}), 400
    
# Enpoint DELETE eliminar una Nueva Tienda-----------------------------------------------------------------------------------
@api.route('/tienda/<int:nombre_tienda>', methods=['DELETE'])
@jwt_required()
def delete_tienda(nombre_tienda):
    
    email = get_jwt_identity()
    vendedor = Vendedor.query.filter_by(email=email).first()
    vendedor_id=vendedor.id
    
    tienda_exist = Tienda.query.filter_by(nombre_tienda=nombre_tienda).first()
    
    if tienda_exist is None:
        return jsonify({"msg":"La tienda no existe"}), 404
    else:
        del_tienda = Tienda.query.filter_by(nombre_tienda=nombre_tienda, vendedor_id=vendedor_id).first()
        # with db.session() as session:
        if del_tienda:
            db.session.delete(del_tienda)
            db.session.commit()
            return jsonify({"msg":"Tienda eliminada"}), 200
        else:
            return jsonify({"msg":"La tienda no existe"}), 404
# ENPOINTS BASE DE DATOS-----------------------------------------------------------------------------------
# ENPOINTS BASE DE DATOS-----------------------------------------------------------------------------------
# ENPOINTS BASE DE DATOS-----------------------------------------------------------------------------------
# ENPOINTS BASE DE DATOS-----------------------------------------------------------------------------------














































































@api.route('/productos', methods=['GET'])
def get_all_productos():

    query_results = Producto.query.all()
    results = list(map(lambda item: item.serialize(), query_results))
   
    if results == []:
        return jsonify({"msg" : "No hay tiendas"}), 404

    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "results": results
    }


    return jsonify(response_body), 200

@api.route('/productos/<int:producto_id>', methods=['GET'])
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
    
# #Enpoint PUT añadir un Nuevo Producto-----------------------------------------------------------------------------------
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

