import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";

export const TodosProductos = ({url_imagen_producto,nombre_producto,descripcion_producto,id,precio}) => {
    const { store, actions } = useContext(Context);

    // const nombre_tienda = store?.tiendas?.nombre_tienda
    return (
        <div>
            <div className="grid-container d-flex mb-2 mt-2 justify-content-space-evenly" style={{ overflowBlock: "scroll" }} key= {id}>
                <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                    <a href={"/infoproducto/"+id}><img src={url_imagen_producto} alt="Image 1" className="img-todos-productos w-20 h-20 object-fit" /></a>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                        <h4 className="text-black text-sm font-bold">{nombre_producto}</h4>
                        <p className="text-black text-xs">{descripcion_producto}</p>
                        <h5 className="text-black">{precio}€</h5>
                        {/* <h5 className="text-black">{store.tiendas.nombre_tienda}</h5> */}
                    </div>
                </div>
            </div>
        </div>
    );
};