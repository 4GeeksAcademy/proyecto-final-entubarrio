import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import "../../styles/home.css";
import { TodosProductos } from "../component/cardTodosProductos";
import { TodasTiendas } from "../component/cardTodasTiendas";

export const Home = () => {
	const { store, actions } = useContext(Context);
    
	useEffect(()=>{
		actions.getTiendas()
		actions.getProductos()

	},[]);
	console.log(store.productos);
	actions.seleccionCategoriaProductos();

	return (
		<div className="text-center mt-0">
			<p>
				<img src={imagenbarrio}
					className="imagen-barrio img-fluid w-150"
					alt="Foto Home" />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<h2>Seleccion de Tiendas</h2>
			<p>Aqui podras encontrar una variedad de tiendas de tu barrio</p>
			<div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
				{store.tiendas.map((tienda) =>{
					return (
						<TodasTiendas nombre_tienda = {tienda.nombre_tienda} key={tienda.id} id ={tienda.id} url_imagen_tienda={tienda.url_imagen_tienda} descripcion_tienda={tienda.descripcion_tienda} />
					)
				})}
			</div>
			<h2>Seleccion de Productos</h2>
			<p>Aqui podras encontrar una variedad de productos de tu barrio</p>
			<div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
			{store.productos.map((producto) =>{
					return (
						<TodosProductos nombre_producto = {producto.nombre_producto} key={producto.id} id ={producto.id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} precio={producto.precio} tienda_id={producto.tienda_id} nombre_tienda={producto.nombre_tienda}/>
					)
				})}
			</div>
		</div>
	);
};