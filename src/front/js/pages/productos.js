import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import { TodosProductos } from "../component/cardTodosProductos";
import "../../styles/todosproductos.css";
import CompararProductos from "../component/cardCompararProductos";

export const Productos = () => {
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getProductos()
	}, [])

    return (
			<>
				<CompararProductos />
			<div className="todos-productos">
			<h2 className="tittles text-danger">Productos</h2>
			<div className="cards row justify-content-center">
				{store.productos.map((producto) => {
					return (
						<div className="bg-body-secondary text col-md-3 col-sw-6 mb-4 d-flex justify-content-center custom-col" key={producto.id}>

							<TodosProductos producto={producto}
								tienda_id={producto.tienda_id}
								id ={producto.id}
								nombre_tienda={producto.nombre_tienda}
								nombre_producto={producto.nombre_producto}
								url_imagen_producto={producto.url_imagen_producto}
								descripcion_producto={producto.descripcion_producto}
								precio={producto.precio}
							/>

						</div>
					);
				})}
			</div>
        </div>
        </>
    );
};