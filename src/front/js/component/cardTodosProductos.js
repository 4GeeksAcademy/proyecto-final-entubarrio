import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/productos.css";

export const TodosProductos = (props) => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="categorias-home container d-flex mb-5 justify-content-space-evenly" style={{ overflowBlock: "scroll" }} key= {props.id}>
                <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                    <a href="/infoproducto"><img src={props.url_imagen_producto} alt="Image 1" className="w-full h-full object-cover" /></a>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                        <h4 className="text-black text-sm font-bold">nombre:{props.nombre_producto}</h4>
                        <p className="text-black text-xs">Descripción:{props.descripcion_producto}</p>
                        <h5 className="text-black">Precio: {props.precio}€</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};