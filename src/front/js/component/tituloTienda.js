import React, { useEffect, useState } from 'react';

const TituloTienda = ({ tiendaId }) => {
    const [loading, setLoading] = useState(true);
    const [tiendaData, setTiendaData] = useState(null);

    useEffect(() => {
        const fetchTiendaData = async () => {
            try {
                const resp = await fetch(`${process.env.BACKEND_URL}api/tienda/${tiendaId}`);
                if (!resp.ok) {
                    throw new Error('Failed to fetch tienda data');
                }
                const data = await resp.json();
                setTiendaData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error obteniendo información de la tienda", error);
                setLoading(false);
            }
        };

        fetchTiendaData();
    }, [tiendaId]);

    return (
        <div className="text custom-titulo">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h3 className="tienda-title mb-4">{tiendaData.nombre_tienda}</h3>
                    <p className="tienda-descripcion mb-4">{tiendaData.descripcion_tienda}</p>
                </div>
            )}
        </div>
    );
};

export default TituloTienda;
