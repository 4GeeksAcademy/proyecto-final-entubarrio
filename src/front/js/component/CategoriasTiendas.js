import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; // Ajusta la ruta de importación según la estructura de tu proyecto
import "../../styles/tienda.css";

const CategoriasTiendas = ({ onCategoriaChange }) => {
    const { store, actions } = useContext(Context);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    useEffect(() => {
        actions.getCategoriasTiendas(); // Llama a la función getCategoriasTiendas al montar el componente
    }, []);

    const handleChange = (event) => {
        const opcion = event.target.value;
        setOpcionSeleccionada(opcion);
        onCategoriaChange(opcion); // Llama a la función para cambiar la categoría
    };

    return (
        <div className="custom-categoria-tienda">
            <div className="custom-header">
                <h2 className="custom-titulo">Selecciona Categoria</h2>
                <select
                    className="form-select-tienda"
                    aria-label="Selecciona Tiendas"
                    value={opcionSeleccionada}
                    onChange={handleChange}
                >
                    <option value="">Selecciona</option>
                    {store.categoriasTiendas.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>
            <div className="cardcontainertiendas">
                {opcionSeleccionada && (
                    <h3>{opcionSeleccionada}</h3>
                )}
            </div>
        </div>
    );
};

export default CategoriasTiendas;
