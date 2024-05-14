import React, { useState } from 'react';
import "../../styles/tiendas.css";
import CardPan from "./cardTiendaPan";
import CardDulces from "./cardTiendaDulces";
import Info from './info';

const TusCategoriasTienda = () => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const handleChange = (event) => {
        const opcion = event.target.value;
        setOpcionSeleccionada(opcion);
    };

    return (
        <div className="custom-categoria-tienda">
            <div className="custom-header">
                <h2 className="custom-titulo">Selecciona Categoria</h2>
                <select className="form-select-tienda" aria-label="Selecciona Productos" value={opcionSeleccionada} onChange={handleChange}>
                    <option value="">Selecciona</option>
                    <option value="opcion1">Pan</option>
                    <option value="opcion2">Dulces</option>
                </select>
            </div>
            <div className="cardcontainertiendas">
                {/* Mostrar las tarjetas correspondientes a la opción seleccionada */}
                {opcionSeleccionada === 'opcion1' && (
                    <>
                        <Info titulo="Pan 1" texto="description" precio="12€" />
                        <Info titulo="Pan 2" texto="description" precio="13€" />
                        <Info titulo="Pan 3" texto="description" precio="14€" />
                        <Info titulo="Pan 4" texto="description" precio="15€" />
                    </>
                )}
                {opcionSeleccionada === 'opcion2' && (
                    <>
                        <CardDulces titulo="Dulce 1" texto="description" precio="15€" />
                        <CardDulces titulo="Dulce 2" texto="description" precio="16€" />
                        <CardDulces titulo="Dulce 3" texto="description" precio="17€" />
                        <CardDulces titulo="Dulce 4" texto="description" precio="18€" />
                    </>
                )}
            </div>
        </div>
    );
};

export default TusCategoriasTienda;
