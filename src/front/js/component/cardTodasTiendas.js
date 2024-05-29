import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todastiendas.css";
import Swal from "sweetalert2";

export const TodasTiendas = ({url_imagen_tienda, nombre_tienda, descripcion_tienda, id, categoria_tienda, direccion_tienda, isFavorito}) => {
    const { store, actions } = useContext(Context);

    let token = localStorage.getItem("token");
    let tipo_usuario = localStorage.getItem("tipo_usuario");

    function addFavoriteTienda(id) {
        // const producto_id = id
        // console.log(isFavorito);
        if (isFavorito) {
            console.log("borrando");
            actions.borrarTiendaFavorita(id)
            Swal.fire({
                title: 'Eliminada',
                text: "Tienda eliminad de tus favoritos",
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            });
        }
        if (isFavorito === undefined) {
            actions.añadirTiendaFavorita(id)
            Swal.fire({
                title: 'Añadida',
                text: "Tienda añadida a tus favoritos",
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            });
        }
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
                <div className="star-tiendas d-flex justify-content-start me-2 mt-3">
                    {tipo_usuario === "particular" && token ? <a href="#" className="btn btn-outline-warning ms-2" onClick={() => addFavoriteTienda(id)}><i className={`fa-regular fa-star ${isFavorito ? "fas" : "far"}`}></i></a> : null}
                </div>
            </div>
        </div>
    );
};
