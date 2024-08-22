import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';

const TituloTienda = () => {

    const { store, actions } = useContext(Context);



    return (
        <div className="text custom-titulo">

                <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h3 className="tienda-title mb-4">{store.tienda.nombre_tienda}</h3>
                    <p className="tienda-descripcion mb-4">{store.tienda.descripcion_tienda}</p>
                </div>
        </div>
    );
};

export default TituloTienda;


