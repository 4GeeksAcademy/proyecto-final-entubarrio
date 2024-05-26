import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TodosProductos } from "../component/cardTodosProductos";

export const Favoritos = () => {
	
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getProductosFavoritos()
		actions.getProductos()
		actions.getTiendas()

	}, []);
	console.log(store.productosFavoritos);
    console.log(store.productos);
    // const productosFavoritos = store.productos.filter((producto)=> producto.id == store.productosFavoritos.producto_id);
    // console.log(productosFavoritos);
    return (
        <div className="text-center mt-5 mb-5">
            <h1>Mis Tiendas Favoritas</h1><br></br>
            <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>


                    
                

			</div>

            <div className="text-center mt-5 mb-5">
            <h1>Mis Productos Favoritos</h1><br></br>
  
                <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>   
                    {store.productosFavoritos.map((producto) => {
                        return (
                            <TodosProductos nombre_producto={producto.nombre_producto} key={producto.id} id={producto.id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} precio={producto.precio} tienda_id={producto.tienda_id} nombre_tienda={producto.nombre_tienda} />
                        )
                    })}  
                </div>
            </div>
                
        </div>
    );
};