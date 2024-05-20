import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { TodosProductos } from "./cardTodosProductos";
import "../../styles/todosproductos.css";



export const CardDesplegable = () => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.getProductos()
	}, [])

    return (
        <div>
            <p className="d-inline-flex gap-1">
                <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Productos
                </a>

            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <div className="cards row justify-content-center">
                        {store.productos.map((producto) => {
                            return (
                                <div className="bg-body-secondary text col-md-3 col-sw-6 mb-4 d-flex justify-content-center custom-col" key={producto.id}>

                                    <TodosProductos producto={producto}
                                        tienda_id={producto.tienda_id}
                                        id={producto.id}
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
            </div>
        </div>

    );
};