import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/tienda.css";
import CardPanaderias from "../component/cardTiendaPan";
import CardVerdulerias from "../component/cardTiendaDulces";
import TituloTienda from "../component/tituloTienda";
import TusCategoriasTienda from "../component/tusCategoriasTienda";
import MapaTienda from "../component/mapaTienda";
import { useParams } from "react-router-dom";
import { TodosProductos } from "../component/cardTodosProductos";

export const Tienda = () => {
    const { store, actions } = useContext(Context);

    const params = useParams()
    console.log(params.id);
    useEffect(()=>{
		actions.getTienda(params.id)
        actions.getProductosTienda(params.id)
        // actions.seleccionCategoriaProductosTienda()
	},[]);
    console.log(store.tienda);
    console.log(store.productosTienda);
    // console.log(store.categoriasProductosTienda);


    return (
        <div>
            <div className="title-shop">
                <div className="text-custom-tienda">

                <TituloTienda 
                // tiendaId={params.id}
                //         descripcion="Aquí iría la descripción de la tienda y tal y tal"
                    />
                </div>


            </div>
            <img src={store.tienda.url_imagen_tienda}
					className="container-fluid d-flex justify-content-center img-fluid w-150"
					alt="Foto Home" />
            <div className="tus-productos">
                <div className="text-custom-tienda">

                    <TusCategoriasTienda titulo="Título Tienda"
                        descripcion="Aquí iría la descripción de los productos"
                    />
                </div>


            </div>
			<div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
			{store.productosTienda.map((producto) =>{
					return (
						<TodosProductos nombre_producto = {producto.nombre_producto} key={producto.id} id ={producto.id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} precio={producto.precio} tienda_id={producto.tienda_id}/>
					)
				})}
			</div>
            <div className="mapa-tienda">
                <div className="text-custom-tienda">

                    <MapaTienda titulo="Título Tienda"
                        descripcion="Aquí iría la descripción del mapa"
                    />
                </div>
            </div>
        </div>
    );
};

