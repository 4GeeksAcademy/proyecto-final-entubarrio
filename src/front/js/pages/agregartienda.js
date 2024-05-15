import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const AgregarTienda = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
            <div className="text-center p-5">
				<h2 className="p-2">Tus Tiendas</h2>
				<p>¿Quieres añadir tienda en tu barrio y gestionar tienda de manera eficiente? <br /> Descubre cómo nuestra plataforma te facilita el proceso.</p>
            </div>
			<div className="row d-flex justify-content-center">
				<div className="col-4">
					<h2>Añade una tienda</h2>
				</div>
				<div className="col-4">
					<form>
						<div className="">
							<label htmlFor="nombre_tienda" className="form-label"></label>
							<input type="text" className="form-control" id="nombre_tienda" placeholder="Nombre de la tienda"/>
						</div>
						<div className="">
							<label htmlFor="descripcion_tienda" className="form-label"></label>
							<input type="text" className="form-control" id="descripcion_tienda" placeholder="Descripción de la tienda"/>
						</div>
						<div className="">
							<label htmlFor="categoria_tienda" className="form-label"></label>
							<input type="text" className="form-control" id="categoria_tienda" placeholder="Categoría"/>
						</div>
						<div className="">
							<label htmlFor="direccion_tienda" className="form-label"></label>
							<input type="text" className="form-control" id="direccion_tienda" placeholder="Dirección"/>
						</div>
						<div className="mb-4">
							<label htmlFor="url_imagen_tienda" className="form-label"></label>
							<input type="text" className="form-control" id="url_imagen_tienda" placeholder="Foto"/>
						</div>
						<button type="submit" className="boton mb-4">Guardar</button>
					</form>
				</div>
            </div>
			<div className="text-center p-5">
				<h2 className="p-2">Gestiona tus Tiendas</h2>
				<p>Descubre cómo gestionar tienda de manera eficiente, directamente en tu barrio. <br /> Simplifica tus operaciones y potencia tu negocio local.</p>
            </div>
		</div>
	);
};