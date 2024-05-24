import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; // Ajusta la ruta de importación según la estructura de tu proyecto
import "../../styles/tienda.css";

const CategoriasProductos = () => {
    const { store, actions } = useContext(Context);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    useEffect(() => {
        actions.getCategoriasProductos(); // Llama a la función getCategoriasProductos del flujo al montar el componente
    }, []);

    const handleChange = (event) => {
        const opcion = event.target.value;
        setOpcionSeleccionada(opcion);
    };

    return (
        <div className="custom-categoria-tienda">
            <div className="custom-header">
                <h2 className="custom-titulo">Selecciona Categoria</h2>
                <select
                    className="form-select-tienda"
                    aria-label="Selecciona Productos"
                    value={opcionSeleccionada}
                    onChange={handleChange}
                >
                    <option value="">Selecciona</option>
                    {store.categoriasProductos.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>
            <div className="cardcontainertiendas">
                {opcionSeleccionada && (
                    <h3>Seleccionaste: {opcionSeleccionada}</h3>
                )}
            </div>
        </div>
    );
};

export default CategoriasProductos;



