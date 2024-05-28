
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
                Vendedor(email="elhornodelaabuela@gmail.com", password="felisa"),
                Vendedor(email="elpanencantado@gmail.com", password="baguette"),


            ]
            db.session.add_all(vendedores)
            db.session.commit()

            tiendas = [
                Tienda(nombre_tienda="Verduras Paco", categoria_tienda="Frutería", direccion_tienda="Calle de Escalante 1, Valencia", descripcion_tienda="La tienda de Paco te trae verduras a saco", url_imagen_tienda="https://frutasyverduraspaco.com/wp-content/themes/yootheme/cache/6306ce68-a34e-4cc9-ae8b-d8282936975a-a14cb339.jpg", vendedor_id=vendedores[0].id),
                Tienda(nombre_tienda="Verduras Isa", categoria_tienda="Frutería", direccion_tienda="Calle Sierra de Cádiz 4, Vallecas, Madrid", descripcion_tienda="En verduras Isa los precios dan risa", url_imagen_tienda="https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg", vendedor_id=vendedores[1].id),
                Tienda(nombre_tienda="La huerta en casa", categoria_tienda="Frutería", direccion_tienda="Calle Badajoz 2, Barcelona", descripcion_tienda="Nuestros productos vienen directos de la huerta", url_imagen_tienda="https://www.sanferescomercio.com/wp-content/uploads/2019/01/LAHUERTAENCASA6.jpg", vendedor_id=vendedores[2].id),
                Tienda(nombre_tienda="Panaderia Pepe", categoria_tienda="Panadería", direccion_tienda="Calle Ávila 24, Barcelona", descripcion_tienda="Los bollos de Pepe están de rechupete", url_imagen_tienda="https://thefoodtech.com/wp-content/uploads/2023/10/PANADERIA-PRINCIPAL-1-828x548.jpg", vendedor_id=vendedores[3].id),
                Tienda(nombre_tienda="El horno de la abuela", categoria_tienda="Panadería", direccion_tienda="Calle Badajoz 17, Barcelona", descripcion_tienda="Los bollos de Pepe están de rechupete", url_imagen_tienda="https://abmauri.es/wp-content/uploads/2023/06/aumentar-ventas-panaderia.jpg", vendedor_id=vendedores[4].id),
                Tienda(nombre_tienda="El pan encantado", categoria_tienda="Panadería", direccion_tienda="Calle Ávila 17, Barcelona", descripcion_tienda="El pan encantado te dejará anonadado", url_imagen_tienda="https://www.colbake.com/wp-content/uploads/2019/01/tradicion-maquinaria-panaderia.jpg", vendedor_id=vendedores[5].id),

            ]
            db.session.add_all(tiendas)
            db.session.commit()

            productos = [
                Producto(nombre_producto="Platanos", descripcion_producto="Directos de Canarias", precio="2", categoria_producto="Frutas", url_imagen_producto="https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202301/24/00118109600041____5__1200x1200.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Platanos", descripcion_producto="Los de Canarias", precio="3", categoria_producto="Frutas", url_imagen_producto="https://lomejordelafruta.com/933-large_default/platanos.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
                Producto(nombre_producto="Platanos", descripcion_producto="Platano de Canarias", precio="2", categoria_producto="Frutas", url_imagen_producto="https://valenciafruits.com/wp-content/uploads/2023/07/PHOTO-2020-11-16-21-50-14-2-1536x1023.jpg", vendedor_id=vendedores[2].id, tienda_id=tiendas[2].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas Gala rojas", precio="2", categoria_producto="Frutas", url_imagen_producto="https://tienda.ecohuertas.com.uy/imagenes/img_contenido/productos/a/gala.jpg", vendedor_id=vendedores[0].id, tienda_id=tiendas[0].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas Gala", precio="4", categoria_producto="Frutas", url_imagen_producto="data:image/jpeg;base64,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", vendedor_id=vendedores[2].id, tienda_id=tiendas[2].id),
                Producto(nombre_producto="Manzanas", descripcion_producto="Manzanas rojas", precio="3", categoria_producto="Frutas", url_imagen_producto="https://tienda.ecohuertas.com.uy/imagenes/img_contenido/productos/a/gala.jpg", vendedor_id=vendedores[1].id, tienda_id=tiendas[1].id),
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
                Producto(nombre_producto="Pan", descripcion_producto="Baguette", precio="3", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2021/3/16158178038498_baguette_rustica_medit_0222_Galeria.png", vendedor_id=vendedores[5].id, tienda_id=tiendas[5].id),
                Producto(nombre_producto="Croissant", descripcion_producto="Como el de París", precio="1", categoria_producto="Dulces", url_imagen_producto="https://panamarbakery.com/public/Image/2022/6/165417222612309-13112_1-croissant-artesano-margcopia_Galeria.png", vendedor_id=vendedores[5].id, tienda_id=tiendas[5].id),
                Producto(nombre_producto="Hogaza de pan", descripcion_producto="Hogaza de 500 g", precio="2", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2022/3/130470-hogazaclasica500gp.png", vendedor_id=vendedores[3].id, tienda_id=tiendas[3].id),
                Producto(nombre_producto="Hogaza de pan", descripcion_producto="Hogaza de 500 g", precio="4", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2022/3/130470-hogazaclasica500gp.png", vendedor_id=vendedores[4].id, tienda_id=tiendas[4].id),
                Producto(nombre_producto="Hogaza de pan", descripcion_producto="Hogaza de 500 g", precio="3", categoria_producto="Pan", url_imagen_producto="https://panamarbakery.com/public/Image/2022/3/130470-hogazaclasica500gp.png", vendedor_id=vendedores[5].id, tienda_id=tiendas[5].id),
                Producto(nombre_producto="Pan de centeno", descripcion_producto="Hogaza de 400 g", precio="4", categoria_producto="Pan", url_imagen_producto="https://masamadremurcia.com/wp-content/uploads/2021/01/PAN.jpg", vendedor_id=vendedores[3].id, tienda_id=tiendas[3].id),
                Producto(nombre_producto="Pan de centeno", descripcion_producto="Hogaza de 400 g", precio="5", categoria_producto="Pan", url_imagen_producto="https://masamadremurcia.com/wp-content/uploads/2021/01/PAN.jpg", vendedor_id=vendedores[4].id, tienda_id=tiendas[4].id),
                Producto(nombre_producto="Pan de centeno", descripcion_producto="Hogaza de 400 g", precio="3", categoria_producto="Pan", url_imagen_producto="https://masamadremurcia.com/wp-content/uploads/2021/01/PAN.jpg", vendedor_id=vendedores[5].id, tienda_id=tiendas[5].id),

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