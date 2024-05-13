import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import "../../styles/productos.css";

export const Productos = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <h1>Productos</h1>
        <h2>Seleccion de Productos</h2>
			<p>Aqui podras encontrar una variedad de productos de tu barrio</p>
			<div className="categorias-home container d-flex mb-5 justify-content-space-evenly" style={{ overflowBlock: "scroll" }}>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Frutas</h3>
						<p className="text-black text-xs">Frutas de temporada</p>
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
			</div>
        {/* <div className="tarjeta-productos card mt-5">
            <img src="https://via.placeholder.com/200" className="card-img-top" alt="imagen ejemplo tarjeta" />
            <div className="card-body flex-column">
                <h4 className="card-title">{titulo}</h4>
                <p className="card-text">{texto}</p>
                <h5 className="card-price">{precio}</h5>
            </div>
        </div> */}
        </>
        
    );
};