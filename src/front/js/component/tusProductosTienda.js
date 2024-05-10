import React from 'react';

const TusProductosTienda = ({ titulo, descripcion }) => {
    return (
        <div className="text custom-titulo">
            <div className="card-body d-flex flex-column justify-content-between text-center">
                <h3 className="tienda-title">{titulo}</h3>
                <p className="tienda-text">{descripcion}</p>
            </div>
        </div>
    );
};

export default TusProductosTienda;