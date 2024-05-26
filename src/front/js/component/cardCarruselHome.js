import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/cardCarruselHome.css";

const CarruselHome = () => {

  return (
    <div className='Carrusel'>
      <div id="carouselExampleAutoplaying" className="carousel slide small-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="/paginatiendas">
              <img src="/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg" className="d-block w-100" alt="..."/>
            </Link>
            <div className="carousel-caption d-none d-md-block text-dark bg-light opacity-75">
              <h5>¡Bienvenido a tu barrio!</h5>
              <p>Aquí encontrarás las mejores tiendas cerca de ti.</p>
            </div>
          </div>
          <div className="carousel-item">
            <Link to="/productos">
              <img src="https://i.blogs.es/833342/istock_000051479416_small/450_1000.webp" className="d-block w-100" alt="..."/>
            </Link>
            <div className="carousel-caption d-none d-md-block text-dark bg-light opacity-75">
              <h5>¡Los mejores productos a la vuelta de la esquina!</h5>
              <p>Aquí encontrarás los mejores productos.</p>
            </div>
          </div>
          <div className="carousel-item">
            <Link to="/createuser">
              <img src="https://grandesamigos.org/wp-content/uploads/2019/05/Grandes-Vecinos_baja.jpg" className="d-block w-100" alt="..."/>
            </Link>
            <div className="carousel-caption d-none d-md-block text-dark bg-light opacity-75">
              <h5>¡Únete al barrio ahora!</h5>
              <p>Regístrate y se uno tu barrio.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarruselHome;