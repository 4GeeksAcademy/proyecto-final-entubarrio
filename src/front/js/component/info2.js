import React from "react";
import { Link } from "react-router-dom";
import Verduras from "../../img/Verduras.png";


// hay que quitar de las lineas 22,30,35 el texto una ves que este la base de datos y la imagen tambien

const Info2 = ({nombre,precio,informacion}) => {
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={Verduras}
              className="img-fluid rounded-start"
              alt="descripción del producto de la foto"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h2 className="card-title">Un tipo de verdura molona{nombre}</h2> 
              <p className="card-text">
                <small className="text-body-secondary">
                  las reviews que tiene esto es un extra
                </small>
              </p>

              <hr />
              <h2 className="mt-4">$ 232 borrar{precio}</h2>
              <h5 className="text-muted">Valoración:<span className="text-warning">★★★★★</span> </h5>
              
              <hr />
              <p className="text-muted">
                informacion del producto .Una Verdura{informacion}
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

      
    </>
  );
};

export default Info2;
