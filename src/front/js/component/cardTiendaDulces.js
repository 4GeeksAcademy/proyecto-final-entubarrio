import React from 'react';
import "../../styles/tiendas.css";

const CardDulces = ({ titulo, texto, precio }) => {
  return (

    <div className="card custom-card mt-5">
      <img src="https://via.placeholder.com/200" className="card-img-top" alt="imagen ejemplo tarjeta" />
      <div className="card-body  flex-column">
        <h4 className="card-title">{titulo}</h4>
        <p className="card-text">{texto}</p>
        <h5 className="card-price">{precio}</h5>
      </div>
    </div>


  );
};

export default CardDulces;
