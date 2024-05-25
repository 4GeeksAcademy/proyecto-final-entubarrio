
import click
from api.models import db, Vendedor, Tienda, Producto, Particular

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            vendedor = Vendedor()
            vendedor.email = "email"
            vendedor.password = "123456"
            vendedor.is_active = True
            db.session.add(vendedor)
            db.session.commit()
            print("User: ", vendedor.email, " created.")

        print("All test users created")

    # @app.cli.command("insert-test-users") # name of our command
    # @click.argument("count") # argument of out command
    # def insert_test_users(count):
    #         print("Creating test users")
    #         for x in range(1, int(count) + 1):
    #             user = User()
    #             user.email = "test_user" + str(x) + "@test.com"
    #             user.password = "123456"
    #             user.is_active = True
    #             db.session.add(user)
    #             db.session.commit()
    #             print("User: ", user.email, " created.")

    #         print("All test users created")

    @app.cli.command("fill-db-with-example-data")
    def fill_db_with_example_data():
        """ Este comando rellenará la base de datos con datos de ejemplo. """
        db.drop_all()
        db.create_all()
        try:
            vendedores = [
                Vendedor(email="verduraspaco@gmail.com", password="111111", ),
                Vendedor(email="verdurasisa@gmail.com", password="123"),
                Vendedor(email="delahuertaatucasa@gmail.com", password="puerros"),
                Vendedor(email="panaderiapepe@gmail.com", password="bollos"),
                Vendedor(email="elhornodelaabuela@gmail.com", password="felisa")

            ]
            db.session.add_all(vendedores)
            db.session.commit()

            tiendas = [
                Tienda(nombre_tienda="Verduras Paco", categoria_tienda="Frutería", direccion_tienda="Calle de Escalante 1, Valencia", descripcion_tienda="La tienda de Paco te trae verduras a saco", url_imagen_tienda="https://frutasyverduraspaco.com/wp-content/themes/yootheme/cache/6306ce68-a34e-4cc9-ae8b-d8282936975a-a14cb339.jpg", vendedor_id=vendedores[0].id),
                Tienda(nombre_tienda="Verduras Isa", categoria_tienda="Frutería", direccion_tienda="Calle Sierra de Cádiz 4, Vallecas, Madrid", descripcion_tienda="En verduras Isa los precios dan risa", url_imagen_tienda="https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg", vendedor_id=vendedores[1].id),
                Tienda(nombre_tienda="La huerta en casa", categoria_tienda="Frutería", direccion_tienda="Calle Badajoz 2, Barcelona", descripcion_tienda="Nuestros productos vienen directos de la huerta", url_imagen_tienda="https://www.sanferescomercio.com/wp-content/uploads/2019/01/LAHUERTAENCASA6.jpg", vendedor_id=vendedores[2].id),
                Tienda(nombre_tienda="Panaderia Pepe", categoria_tienda="Panadería", direccion_tienda="Calle Ávila 24, Barcelona", descripcion_tienda="Los bollos de Pepe están de rechupete", url_imagen_tienda="https://thefoodtech.com/wp-content/uploads/2023/10/PANADERIA-PRINCIPAL-1-828x548.jpg", vendedor_id=vendedores[3].id),
                Tienda(nombre_tienda="El horno de la abuela", categoria_tienda="Panadería", direccion_tienda="Calle Badajoz 17, Barcelona", descripcion_tienda="Los bollos de Pepe están de rechupete", url_imagen_tienda="https://abmauri.es/wp-content/uploads/2023/06/aumentar-ventas-panaderia.jpg", vendedor_id=vendedores[4].id),
            ]
            db.session.add_all(tiendas)
            db.session.commit()

            productos = [
                Producto(nombre_producto="Platanos", descripcion_producto="Directos de Canarias", precio="2", categoria_producto="Frutas", url_imagen_producto="https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202301/24/00118109600041____5__1200x1200.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Platanos", descripcion_producto="Directos de Canarias", precio="3", categoria_producto="Frutas", url_imagen_producto="https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202301/24/00118109600041____5__1200x1200.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Platanos", descripcion_producto="Directos de Canarias", precio="2", categoria_producto="Frutas", url_imagen_producto="https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202301/24/00118109600041____5__1200x1200.jpg", vendedor_id=vendedores[2].id, tienda_id=tiendas[2].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas Gala rojas", precio="2", categoria_producto="Frutas", url_imagen_producto="https://tienda.ecohuertas.com.uy/imagenes/img_contenido/productos/a/gala.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas Gala rojas", precio="4", categoria_producto="Frutas", url_imagen_producto="https://tienda.ecohuertas.com.uy/imagenes/img_contenido/productos/a/gala.jpg", vendedor_id=vendedores[2].id, tienda_id=tiendas[2].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas Gala rojas", precio="3", categoria_producto="Frutas", url_imagen_producto="https://tienda.ecohuertas.com.uy/imagenes/img_contenido/productos/a/gala.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Tomates", descripcion_producto="Tomates en rama", precio="3", categoria_producto="Verduras", url_imagen_producto="https://www.tastingtable.com/img/gallery/20-tricks-to-make-your-tomatoes-even-more-delicious/intro-1684770527.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Tomates", descripcion_producto="Tomates en rama", precio="4", categoria_producto="Verduras", url_imagen_producto="https://www.tastingtable.com/img/gallery/20-tricks-to-make-your-tomatoes-even-more-delicious/intro-1684770527.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Pimientos del padron", descripcion_producto="Unos pican y otros no", precio="5", categoria_producto="Verduras", url_imagen_producto="https://upload.wikimedia.org/wikipedia/commons/5/54/Pementos_de_Padron.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Pimientos del padron", descripcion_producto="Unos pican y otros no", precio="4", categoria_producto="Verduras", url_imagen_producto="https://upload.wikimedia.org/wikipedia/commons/5/54/Pementos_de_Padron.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Miel", descripcion_producto="Miel de Espliego", precio="9", categoria_producto="Miel", url_imagen_producto="https://www.lamieleria.com/tienda/49-thickbox_default/miel-de-espliego-tarro-1-kg.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Miel", descripcion_producto="Miel de Espliego", precio="10", categoria_producto="Miel", url_imagen_producto="https://www.lamieleria.com/tienda/49-thickbox_default/miel-de-espliego-tarro-1-kg.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Miel", descripcion_producto="Miel de Espliego", precio="11", categoria_producto="Miel", url_imagen_producto="https://www.lamieleria.com/tienda/49-thickbox_default/miel-de-espliego-tarro-1-kg.jpg", vendedor_id=vendedores[2].id, tienda_id=tiendas[2].id),
                Producto(nombre_producto="Pan", descripcion_producto="Baguette", precio="1", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2021/3/16158178038498_baguette_rustica_medit_0222_Galeria.png", vendedor_id=vendedores[3].id, tienda_id=tiendas[3].id),
                Producto(nombre_producto="Pan", descripcion_producto="Baguette", precio="2", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2021/3/16158178038498_baguette_rustica_medit_0222_Galeria.png", vendedor_id=vendedores[4].id, tienda_id=tiendas[4].id),
                Producto(nombre_producto="Croissant", descripcion_producto="Como el de París", precio="2", categoria_producto="Dulces", url_imagen_producto="https://panamarbakery.com/public/Image/2022/6/165417222612309-13112_1-croissant-artesano-margcopia_Galeria.png", vendedor_id=vendedores[3].id, tienda_id=tiendas[3].id),
                Producto(nombre_producto="Croissant", descripcion_producto="Como el de París", precio="1", categoria_producto="Dulces", url_imagen_producto="https://panamarbakery.com/public/Image/2022/6/165417222612309-13112_1-croissant-artesano-margcopia_Galeria.png", vendedor_id=vendedores[4].id, tienda_id=tiendas[4].id),

            ]
            db.session.add_all(productos)
            db.session.commit()

            particulares = [
                Particular(email="jamesbond@gmail.com", password="007", ),
                Particular(email="homersimpson@gmail.com", password="742"),
                Particular(email="lukeskywalker@gmail.com", password="r2d2"),
                Particular(email="obiwan@gmail.com", password="kenoby")

            ]
            db.session.add_all(particulares)
            db.session.commit()

#             hobbies = [
#                 Hobbie(name="Fotografía"),
#                 Hobbie(name="Ciclismo"),
#                 Hobbie(name="Dibujo"),
#                 Hobbie(name="Programación")
#             ]
#             db.session.add_all(hobbies)
#             db.session.commit()
#             psychologists = [
#                 Phycologyst(name="Ana", surnames="Pérez", email="
# ana@mymood.com
# ", password="secure", experience=5),
#                 Phycologyst(name="Carlos", surnames="Gómez", email="
# carlos@mymood.com
# ", password="secure", experience=7)
#             ]
#             db.session.add_all(psychologists)
#             db.session.commit()
#             resource_types = [
#                 ResourceType(resource_type="Artículo"),
#                 ResourceType(resource_type="Vídeo"),
#                 ResourceType(resource_type="Imagen"),
#                 ResourceType(resource_type="Podcast")
#             ]
#             db.session.add_all(resource_types)
#             db.session.commit()
#             resources = [
#                 Resource(resource_type_id=resource_types[0].id, url="
# https://example.com/articulo1
# ", description="Cómo manejar el estrés", phycologyst_id=psychologists[0].id),
#                 Resource(resource_type_id=resource_types[1].id, url="https://example.com/video1", description="Meditación para principiantes", phycologyst_id=psychologists[1].id)
#             ]
#             db.session.add_all(resources)
#             db.session.commit()
#             locations = [
#                 Location(latitude=40.7128, longitude=-74.0060),
#                 Location(latitude=34.0522, longitude=-118.2437),
#                 Location(latitude=41.8781, longitude=-87.6298)
#             ]
#             db.session.add_all(locations)
#             db.session.commit()
#             # Acciones relacionadas con las categorías de estados de ánimo
#             actions = [
#                 Action(action="Hablar con un amigo", description="Compartir tus sentimientos puede ayudar a ver las cosas desde otra perspectiva.", category_id=categories[0].id),  # Feliz/Contento
#                 Action(action="Escribir en un diario", description="Escribir tus pensamientos puede ayudarte a comprenderlos mejor.", category_id=categories[1].id),  # Triste/Deprimido
#                 Action(action="Meditación", description="La meditación puede ayudarte a calmar tu mente.", category_id=categories[2].id),  # Ansioso/Estresado
#                 Action(action="Ejercicio físico", description="El ejercicio puede ayudar a liberar la tensión acumulada.", category_id=categories[3].id)  # Enojado/Frustrado
#             ]
#             db.session.add_all(actions)
#             db.session.commit()
#             # Historial de estados de ánimo de los usuarios
#             user_mood_history_entries = [
#                 UserMoodHistory(user_id=users[0].id, date=datetime.date.today() - datetime.timedelta(days=1), mood_id=moods[0].id),
#                 UserMoodHistory(user_id=users[1].id, date=datetime.date.today() - datetime.timedelta(days=2), mood_id=moods[1].id),
#                 UserMoodHistory(user_id=users[2].id, date=datetime.date.today() - datetime.timedelta(days=3), mood_id=moods[2].id)
#             ]
#             db.session.add_all(user_mood_history_entries)
#             db.session.commit()
#             # Chats entre usuarios
#             chats = [
#                 Chat(user_sender_id=users[0].id, user_reciver_id=users[1].id, message_text="¡Hola! ¿Cómo te sientes hoy?", time=datetime.datetime.now() - datetime.timedelta(hours=1)),
#                 Chat(user_sender_id=users[1].id, user_reciver_id=users[0].id, message_text="Hola, me siento bastante bien, ¿y tú?", time=datetime.datetime.now() - datetime.timedelta(minutes=50)),
#                 Chat(user_sender_id=users[0].id, user_reciver_id=users[1].id, message_text="También estoy bien, gracias por preguntar.", time=datetime.datetime.now() - datetime.timedelta(minutes=30)),
#             ]
#             db.session.add_all(chats)
#             db.session.commit()
            print("La base de datos ha sido poblada con datos de ejemplo.")
        except Exception as e:
            db.session.rollback()
            print(f"Error al llenar la base de datos: {e}")









    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass