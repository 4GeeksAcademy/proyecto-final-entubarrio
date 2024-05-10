import React from 'react';
import "../../styles/tiendas.css";

const TusProductosTienda = () => {
    return (
        <div className="custom-productos">
            <div className="custom-header">
                <h2 className="custom-titulo">Tus Productos</h2>
                <select className="form-select" aria-label="Selecciona Productos">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                </select>
            </div>
            <div className="custom-body">
                {/* Aquí puedes importar y renderizar el componente de las tarjetas */}
                {/* Ejemplo: <TusTarjetasComponente /> */}
            </div>
        </div>
    );
};

export default TusProductosTienda;