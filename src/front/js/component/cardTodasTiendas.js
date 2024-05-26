import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todastiendas.css";

export const TodasTiendas = ({url_imagen_tienda, nombre_tienda, descripcion_tienda, id, categoria_tienda, direccion_tienda,}) => {
    const { store, actions } = useContext(Context);

    const addStar = store.tiendasFavoritas
    const tienda_id = id
    function addFavoriteTienda() {
        actions.añadirTiendaFavorita(tienda_id)
      }

    function deleteFavoriteTienda() {
        actions.borrarTiendaFavorita(tienda_id)
        }

    return (
        <div className="grid-container">
            <div
                className="tarjeta-tienda"
                key={id}
            >
                <a href={`/tienda/${id}`}>
                    <img
                        src={url_imagen_tienda}
                        alt="Image 1"
                        className="img-tienda"
                    />
                </a>
                <div className="tarjeta-tienda-info">
                    <h4 className="titulo-tienda">{nombre_tienda}</h4>
                    <p className="descripcion-tienda">{descripcion_tienda}</p>
                    <p className="precio-tienda">{categoria_tienda}</p>
                    <a className="text-black text-xs pb-0" href="https://www.google.es/maps">
                        Dirección: {direccion_tienda}
                    </a>
                </div>
                <div className="star-tiendas d-flex justify-content-end me-2 mt-3">
                    <a href="#" className="btn btn-outline-warning ms-5" onClick={addFavoriteTienda}><i className={`fa-regular fa-star ${addStar ? "fas" : "far"}`}></i></a>
                </div>
            </div>
        </div>
    );
};
