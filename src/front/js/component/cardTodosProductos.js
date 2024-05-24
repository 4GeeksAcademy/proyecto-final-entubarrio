import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";

export const TodosProductos = ({ url_imagen_producto, nombre_producto, descripcion_producto, id, precio, tienda_id, nombre_tienda }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="grid-container">
            <div className="tarjeta-producto">
                <a href={`/infoproducto/${id}/tienda/${tienda_id}`}>
                    <img
                        src={url_imagen_producto}
                        alt="Image 1"
                        className="img-producto"
                    />
                </a>
                <div className="tarjeta-producto-info">
                    <h4 className="titulo-producto">{nombre_producto}</h4>
                    <p className="descripcion-producto">{descripcion_producto}</p>
                    <div className="precio-tienda-container">
                        <b className="text-black text-xs">{nombre_tienda}</b>
                        <h5 className="text-black">{precio}€</h5>
                    </div>
                    {/* <h5 className="text-black">{store.tiendas.nombre_tienda}</h5> */}
                </div>
            </div>
        </div>
    );
};

{/* <div className="grid-container">
            <div
                className="tarjeta-producto"
                key={id}
            >
                <a href={"/infoproducto/"+id+"/tienda/"+tienda_id}>
                    <img
                        src={url_imagen_producto}
                        alt="Image 1"
                        className="img-producto"
                    />
                </a>
                <div className="tarjeta-producto-info">
                    <h4 className="titulo-producto">{nombre_producto}</h4>
                    <b className="text-black text-xs">{nombre_tienda}</b>
                    <p className="descripcion-producto">{descripcion_producto}</p>
                    <h5 className="precio-producto">{precio}€</h5>
                </div>
            </div>
        </div> */}