import React, { useState } from 'react';
import "../../styles/tiendas.css";

const TusProductosTienda = () => {
   
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [contenidoCuerpo, setContenidoCuerpo] = useState('');

    
    const handleChange = (event) => {
        const opcion = event.target.value;
        setOpcionSeleccionada(opcion);
        
        
        switch (opcion) {
            case 'opcion1':
                setContenidoCuerpo(<h1>Opción 1 seleccionada</h1>);
                break;
            case 'opcion2':
                setContenidoCuerpo(<h1>Opción 2 seleccionada</h1>);
                break;
            case 'opcion3':
                setContenidoCuerpo(<h1>Opción 3 seleccionada</h1>);
                break;
            default:
                setContenidoCuerpo('');
                break;
        }
    };

    return (
        <div className="custom-productos">
            <div className="custom-header">
                <h2 className="custom-titulo">Productos</h2>
                <select className="form-select" aria-label="Selecciona Productos" value={opcionSeleccionada} onChange={handleChange}>
                    <option value="">Selecciona</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                </select>
            </div>
            <div className="custom-body">
                {/* Mostrar el contenido del cuerpo según la opción  */}
                {contenidoCuerpo}
            </div>
        </div>
    );
};

export default TusProductosTienda;
