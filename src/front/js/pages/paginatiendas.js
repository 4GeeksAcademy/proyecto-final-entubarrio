import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { TodasTiendas } from "../component/cardTodasTiendas";
import "../../styles/todastiendas.css";

export const PaginaTiendas = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getTiendas()
	}, [])

	return (
		<div className="todas-tiendas">
			<h2 className="tittles text-danger">Tiendas</h2>
			<div className="cards row justify-content-center">
				{store.tiendas.map((tienda) => {
					return (
						<div className="bg-body-secondary text col-md-3 col-sw-6 mb-4 d-flex justify-content-center custom-col"
							key={tienda.id}>
							{/* <div className="text m-3" > */}

								<TodasTiendas tienda={tienda}
									// type={people}
									nombre_tienda={tienda.nombre_tienda}
									id={tienda.id}
									descripcion_tienda={tienda.descripcion_tienda}
									categoria_tienda={tienda.categoria_tienda}
									direccion_tienda={tienda.direccion_tienda}
									url_imagen_tienda={tienda.url_imagen_tienda}
								/>
							{/* </div> */}
						</div>
					);
				})}
			</div>
		</div>

	);
};