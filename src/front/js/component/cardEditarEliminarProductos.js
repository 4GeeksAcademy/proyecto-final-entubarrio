import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const EditarEliminarProductos = ({ url_imagen_producto, nombre_producto, descripcion_producto, id, precio, tienda_id, nombre_tienda, producto }) => {
    const { store, actions } = useContext(Context);

    const token = localStorage.getItem("token");

    const navigate = useNavigate()

    return (
        <div>
            <div className="grid-container" style={{ overflowBlock: "scroll" }} key={id}>
                <div className="tarjeta-tienda">
                    <a href={"/infoproducto/" + id + "/tienda/" + tienda_id}><img src={url_imagen_producto} alt="Image 1" className="img-tienda" /></a>
                    <div className="tarjeta-tienda-info">
                        <h4 className="titulo-tienda">{nombre_producto}</h4>
                        <p className="descripcion-producto">{descripcion_producto}</p>
                        <h5 className="text-black">{precio}€</h5>
                        <div>
                            <button type="button" className="btn btn-success m-2" onClick={() => {
                                actions.verProducto(producto)
                                navigate("/editarproducto")
                            }}><i className="fa fa-pen p-1" /></button>
                            <button type="button" className="btn btn-danger m-2"><i className="fa fa-trash p-1" onClick={() => {
                                    Swal.fire({
                                        title: "¿Estás seguro?",
                                        text: "¡Este producto promete!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "¡Sí, elimínalo!",
                                        cancelButtonText: "¡No, espera!"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            actions.borrarProducto(id, token);
                                            window.location.reload();
                                            Swal.fire({
                                                title: "¡Eliminado!",
                                                text: "Ya no tienes este producto.",
                                                icon: "success"
                                            });
                                        }
                                    });
                             }} /></button >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};