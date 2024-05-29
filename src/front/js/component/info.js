import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/info.css";
import Swal from "sweetalert2";



// hay que quitar de las lineas 22,30,35 el texto una ves que este la base de datos y la imagen tambien

const Info = ({ url_imagen_producto, nombre_producto, descripcion_producto, precio, id, isFavorito, nombre_tienda }) => {
  const { store, actions } = useContext(Context);

  let token = localStorage.getItem("token");
  let tipo_usuario = localStorage.getItem("tipo_usuario");

  function addFavoriteProduct(id) {
    // const producto_id = id
    console.log(isFavorito);
    if (isFavorito) {
      console.log("borrando");
      actions.borrarProductoFavorito(id)
      Swal.fire({
        title: 'Eliminado',
        text: "Producto eliminado de tus favoritos",
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (isFavorito === undefined) {
      actions.añadirProductoFavorito(id)
      Swal.fire({
        title: 'Añadido',
        text: "Producto añadido a tus favoritos",
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="info-tarjeta card mb-3 col-8">
        <div className="row g-0 d-flex justify-content-around">
          <div className="col-md-4">
            <img
              src={url_imagen_producto}
              className="img-fluid info-imagen"
              alt="descripción del producto de la foto"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h2 className="card-title">{nombre_producto}</h2>
              <p className="card-text">
              </p>
              <hr />
              <p className="text-muted">
                {descripcion_producto}
              </p>
              <hr />
              <h5 className="text-black">
                {nombre_tienda}
              </h5>
              <hr />
              <h2 className="mt-4">{precio}€</h2>
              <hr />
              <div className="star-tiendas d-flex justify-content-start me-2 mt-3">
                {tipo_usuario === "particular" && token ? <a href="#" className="btn btn-outline-warning ms-2" onClick={() => addFavoriteProduct(id)}><i className={`fa-regular fa-star ${isFavorito ? "fas" : "far"}`}></i></a> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
