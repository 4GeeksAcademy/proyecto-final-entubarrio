import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import { TodasTiendas } from "../component/cardTodasTiendas";
import "../../styles/todastiendas.css";

export const PaginaTiendas = () => {
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getTiendas()
	}, [])

    return (
			<div className="todas-tiendas container mt-5">
			<h2 className="tittles text-danger ms-5">Tiendas</h2>
			<div className="cards d-flex mx-4" style={{ overflowX: "scroll" }}>
				{store.tiendas.map((tienda) => {
					return (
						<div className="text m-3" key={tienda.id}>

							<TodasTiendas tienda={tienda}
								// type={people}
								nombre_tienda={tienda.nombre_tienda}
								id={tienda.id}
                                descripcion_tienda={tienda.descripcion_tienda}
                                categoria_tienda={tienda.categoria_tienda}
                                direccion_tienda={tienda.direccion_tienda}
								url_imagen_tienda={tienda.url_imagen_tienda}
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