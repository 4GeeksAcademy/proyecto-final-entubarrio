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
# @api.route('/details-tienda/<string:nombre_tienda>/<int:producto_id>', methods=['GET'])
# def get_one_tienda_one_producto(nombre_tienda, producto_id):
#     # this is how you can use the Family datastructure by calling its methods
#     # tienda = Tienda.query.get(nombre_tienda)
#     # producto = Producto.query.get(id)
#     check_tienda_producto = Tienda.query.filter_by(nombre_tienda=tienda, producto_id=producto, ).first()  

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

# #Enpoint PUT añadir una Nueva Tienda-----------------------------------------------------------------------------------
# @api.route("/tienda", methods=["PUT"]) # ¿es necesario poner el id del vendedor?
# @jwt_required()
# def edit_tienda():

#     email = get_jwt_identity()
#     vendedor = Vendedor.query.filter_by(email=email).first()
#     vendedor_id=vendedor.id

#     nombre_tienda = request.json.get("nombre_tienda", None)
#     descripcion_tienda = request.json.get("descripcion_tienda", None)
#     categoria_tienda = request.json.get("categoria_tienda", None)
#     direccion_tienda = request.json.get("direccion_tienda", None)
#     url_imagen_tienda = request.json.get("url_imagen_tienda", None)
    
#     tienda_exist = Tienda.query.filter_by(nombre_tienda=nombre_tienda).first()

#     # poner error si el nombre ya existe
#     if tienda_exist is None:
#         edit_tienda = Tienda(
#             nombre_tienda=nombre_tienda,
#             descripcion_tienda=descripcion_tienda,
#             categoria_tienda=categoria_tienda,
#             direccion_tienda=direccion_tienda,
#             url_imagen_tienda=url_imagen_tienda,
#             vendedor_id=vendedor_id           # es necesario el id para asignar la tienda
#         )
#         db.session.add(edit_tienda)
#         db.session.commit()
#         return jsonify({"msg": "Tienda creada correctamente"}), 200

#     else:
#         return jsonify({"msg": "La tienda ya existe"}), 400