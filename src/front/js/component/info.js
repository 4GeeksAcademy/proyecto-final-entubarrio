import React from "react";
import { Link } from "react-router-dom";
import barraPan from "../../img/barra_pan.jpg";


const Info = ({url_imagen_producto,nombre_producto,descripcion_producto,precio,id}) => {
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
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
              <h2 className="mt-4">$ {precio}</h2>
              {/* <h5 className="text-muted">Valoración:<span className="text-warning">★★★★★</span> </h5> */}
              
              <hr />
              <p className="text-muted">
                {descripcion_producto}
              </p>
             
              <hr />
              <Link to="/">
                <button type="button" className="btn btn-primary btn-lg">
                  {/* el boton tiene que ir a la parte de REVIEWS es un EXTRA*/}
                  Valoracion
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      

      
    </>
  );
};

export default Info;
