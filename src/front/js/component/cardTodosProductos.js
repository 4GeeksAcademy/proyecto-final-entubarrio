import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";

export const TodosProductos = ({ url_imagen_producto, nombre_producto, descripcion_producto, id, precio, tienda_id, nombre_tienda, categoria_producto }) => {
    const { store, actions } = useContext(Context);

    const addStar = store.productosFavoritos
    const producto_id = id
    function addFavoriteProduct() {
        actions.añadirProductoFavorito(producto_id)
      }

    function deleteFavoriteProduct() {
    actions.borrarProductoFavorito(producto_id)
    console.log();
    }

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
                    </div>
                    <div className="star-productos d-flex justify-content-end me-2 mt-2">
                    <a href="#" className="btn btn-outline-warning ms-5" onClick={addFavoriteProduct}><i className={`fa-regular fa-star ${addStar ? "fas" : "far"}`}></i></a>
                </div>
                </div>
            </div>
        </div>
    );
};
