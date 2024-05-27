import React, { useContext } from "react";
import { Link } from "react-router-dom";
import barraPan from "../../img/barra_pan.jpg";
import { Context } from "../store/appContext";


// hay que quitar de las lineas 22,30,35 el texto una ves que este la base de datos y la imagen tambien

const Info = ({url_imagen_producto,nombre_producto,descripcion_producto,precio,id, isFavorito}) => {

  const { store, actions } = useContext(Context);

  function addFavoriteProduct(id) {
    // const producto_id = id
    console.log(isFavorito);
    if (isFavorito) {
        console.log("borrando");
        actions.borrarProductoFavorito(id)
    }
    if (isFavorito === undefined) {
        actions.añadirProductoFavorito(id)
    }
}
  return (
    <div className="d-flex justify-content-center">
      <div className="card mb-3 col-8">
        <div className="row g-0 d-flex justify-content-around">
          <div className="col-md-4">
            <img
              src={url_imagen_producto}
              className="img-fluid rounded-start"
              alt="descripción del producto de la foto"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h2 className="card-title">{nombre_producto}</h2> 
              <p className="card-text">
                {/* <small className="text-body-secondary">
                  las reviews que tiene esto es un extra
                </small> */}
              </p>

              <hr />
              <h2 className="mt-4">{precio} €</h2>
              {/* <h5 className="text-muted">Valoración:<span className="text-warning">★★★★★</span> </h5> */}
              
              <hr />
              <p className="text-muted">
                {descripcion_producto}
              </p>
             
              <hr />
              <button className="btn btn-warning">
                <a href="#" onClick={()=>addFavoriteProduct(id)}><i className={`fa-regular fa-star ${isFavorito ? "fas" : "far"}`}></i> Añadir a favoritos</a>
              </button>
              {/* <div className="star-productos d-flex justify-content-end me-2 mt-2">
                    <a href="#" className="btn btn-outline-warning ms-5" onClick={()=>addFavoriteProduct(id)}><i className={`fa-regular fa-star ${isFavorito ? "fas" : "far"}`}></i></a>
                </div> */}
            </div>
          </div>
        </div>
      </div>
      

{/*       esta es una alternativa descartada pero funcional pero es mejor la otra claro esta :)


      <div className="row mt-5">
        <div className="col-md-2">
          <img
            src={barraPan}
            className="img-fluid rounded-circle"
            alt="Producto"
          />
        </div>



        <div className="col-md-4">
          <h1>Producto</h1>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className="d-flex justify-content-between mt-4">
            <h5 className="text-muted">Valoración:</h5>
            <span className="text-warning">★★★★★</span>
          </div>

          <h2 className="mt-4">$ 1232</h2>

          <button type="button" className="btn btn-primary mt-4">
            Comprar
          </button>
        </div>
      </div>
      <br></br>
      <hr/> */}

      
    </div>
  );
};

export default Info;
