import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext'; // Importa el contexto

const TituloTienda = () => {
    const { store, actions } = useContext(Context); // Obtiene el store y las acciones del contexto
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        actions.getMessage(); // Llama a la acción getMessage cuando el componente se monta
    }, [actions]);

    useEffect(() => {
        // Establece loading a false cuando el mensaje se ha cargado en el store
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
                </div>
            )}
        </div>
    );
};

export default TituloTienda;