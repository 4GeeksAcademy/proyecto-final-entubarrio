import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import "../../styles/productos.css";

export const Productos = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <h1>Productos</h1>
        {/* <div className="tarjeta-productos card mt-5">
            <img src="https://via.placeholder.com/200" className="card-img-top" alt="imagen ejemplo tarjeta" />
            <div className="card-body flex-column">
                <h4 className="card-title">{titulo}</h4>
                <p className="card-text">{texto}</p>
                <h5 className="card-price">{precio}</h5>
            </div>
        </div> */}
        </>
        
    );
};