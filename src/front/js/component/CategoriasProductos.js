import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'; 
import "../../styles/tienda.css";

const CategoriasProductos = ({ onCategoriaChange, id }) => {
    const { store, actions } = useContext(Context);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    useEffect(() => {
        actions.getCategoriasProductosTienda(id); 
    }, []);

    const handleChange = (event) => {
        const opcion = event.target.value;
        setOpcionSeleccionada(opcion);
        onCategoriaChange(opcion); 
    };

    return (
        <div className="custom-categoria-tienda">
            <div className="custom-header">
                <h5 className="custom-titulo">Selecciona Categoria</h5>
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
                    <h3>{opcionSeleccionada}</h3>
                )}
            </div>
        </div>
    );
};

export default CategoriasProductos;
