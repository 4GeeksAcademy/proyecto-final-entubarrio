import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
// import "../../styles/productos.css";

export const TodasTiendas = ({url_imagen_tienda,nombre_tienda,descripcion_tienda,id}) => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="categorias-home d-flex mb-5 justify-content-space-evenly" style={{ overflowBlock: "scroll" }} key= {id}>
                <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                    <a href="/infoproducto"><img src={url_imagen_tienda} alt="Image 1" className="w-full h-full object-cover" /></a>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                        <h4 className="text-black text-sm font-bold">{nombre_tienda}</h4>
                        <p className="text-black text-xs">{descripcion_tienda}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};