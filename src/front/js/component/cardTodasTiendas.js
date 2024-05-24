import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todastiendas.css";

export const TodasTiendas = ({url_imagen_tienda, nombre_tienda, descripcion_tienda, id, categoria_tienda, direccion_tienda,}) => {
    const { store, actions } = useContext(Context);

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
            </div>
        </div>
    );
};
