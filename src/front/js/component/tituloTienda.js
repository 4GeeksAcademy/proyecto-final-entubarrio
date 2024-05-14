import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext'; 

const TituloTienda = () => {
    const { store, actions } = useContext(Context); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        actions.getMessage(); 
    }, [actions]);

    useEffect(() => {
        
        if (store.message !== null) {
            setLoading(false);
        }
    }, [store.message]);

    return (
        <div className="text custom-titulo">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h3 className="tienda-title mb-4">{store.message}</h3>
                    <p className="tienda-descripcion mb-4">{store.message}</p>
                </div>
            )}
        </div>
    );
};

export default TituloTienda;