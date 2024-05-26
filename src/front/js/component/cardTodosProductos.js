import React, { useContext } from "react";
import "../../styles/todosproductos.css";

export const TodosProductos = ({ url_imagen_producto, nombre_producto, descripcion_producto, id, precio, tienda_id, nombre_tienda, categoria_producto }) => {
    return (
        <div className="grid-container">
            <div className="tarjeta-producto">
                <a href={`/infoproducto/${id}/tienda/${tienda_id}`}>
                    <img
                        src={url_imagen_producto}
                        alt={nombre_producto}
                        className="img-producto"
                    />
                </a>
                <div className="tarjeta-producto-info">
                    <h4 className="titulo-producto">{nombre_producto}</h4>
                    <p className="descripcion-producto">{descripcion_producto}</p>
                    <div className="precio-tienda-container">
                        <b className="ms-2 text-black text-xs">{nombre_tienda}</b>
                        <h5 className="precio-producto">{precio}€</h5>
                        <i className="btn fa-solid fa-star mb-3"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};
