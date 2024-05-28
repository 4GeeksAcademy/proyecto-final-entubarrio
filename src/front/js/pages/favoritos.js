import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TodosProductos } from "../component/cardTodosProductos";
import { TodasTiendas } from "../component/cardTodasTiendas";
import "../../styles/paginafavoritos.css";

export const Favoritos = () => {
	
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getProductosFavoritos()
		actions.getProductos()
		actions.getTiendas()
        actions.getTiendasFavoritas()

	}, []);
	console.log(store.tiendasFavoritas);
    console.log(store.productosFavoritos);
    // const productosFavoritos = store.productos.filter((producto)=> producto.id == store.productosFavoritos.producto_id);
    // console.log(productosFavoritos);
    return (
        <div className="pagina-favoritos text-center">
            <h1>Mis Tiendas Favoritas</h1><br></br>
            <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
                {store.tiendasFavoritas.map((tienda) => {
					return (
						<TodasTiendas nombre_tienda={tienda.nombre_tienda} key={tienda.id} id={tienda.tienda_id} url_imagen_tienda={tienda.url_imagen_tienda} descripcion_tienda={tienda.descripcion_tienda} direccion_tienda={tienda.direccion_tienda} isFavorito={tienda.isFavorito} />
					)
				})}

                    
                

			</div>

            <div className="text-center mt-5 mb-5">
            <h1>Mis Productos Favoritos</h1><br></br>
  
                <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>   
                    {store.productosFavoritos.map((producto) => {
                        return (
                            <TodosProductos nombre_producto={producto.nombre_producto} key={producto.id} id={producto.producto_id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} precio={producto.precio} tienda_id={producto.tienda_id} nombre_tienda={producto.nombre_tienda} isFavorito={producto.isFavorito}/>
                        )
                    })}  
                </div>
            </div>
                
        </div>
    );
};