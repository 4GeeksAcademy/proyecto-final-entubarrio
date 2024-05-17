import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import { TodosProductos } from "../component/cardTodosProductos";
import "../../styles/todosproductos.css";

export const Productos = () => {
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getProductos()
	}, [])

    return (
			<div className="productos">
			<div className="tittles text-danger">Productos</div>
			<div className="cards row justify-content-center">
				{store.productos.map((producto) => {
					return (
						<div className="bg-body-secondary text col-md-3 col-sm-6 mb-4 d-flex justify-content-center custom-col" key={producto.id}>

							<TodosProductos producto={producto}
								tienda_id={producto.tienda_id}
								id ={producto.id}
								nombre_producto={producto.nombre_producto}
								url_imagen_producto={producto.url_imagen_producto}
								descripcion_producto={producto.descripcion_producto}
								precio={producto.precio}
							/>

						</div>
					);
				})}
			</div>
			{/* <div className="categorias-home container d-flex mb-5 justify-content-space-evenly" style={{ overflowBlock: "scroll" }}>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Frutas</h3>
						<p className="text-black text-xs">Frutas de temporada</p>
						<p className="text-black">{precio}€ Kg</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Verduras</h3>
						<p className="text-black text-xs">Verduras y Hortalizas</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
					<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Pan</h3>
						<p className="text-black text-xs">Pan casero</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Dulces</h3>
						<p className="text-black text-xs">Dulces y tartas</p>
					</div>
				</div>
			</div> */}
        </div>
        
    );
};