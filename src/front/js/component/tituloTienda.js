import React from 'react';

const TituloTienda = ({ titulo, texto, boton }) => {
  return (
    <div className="text custom-titulo" style={{ width: '50%', margin: '0.1rem' }}>
      
      <div className="card-body d-flex flex-column justify-content-between text-center">
        <h1 className="card-title">{titulo}</h1>
        <p className="card-text">{texto}</p>
       
      </div>
    </div>
  );
};

export default TituloTienda;