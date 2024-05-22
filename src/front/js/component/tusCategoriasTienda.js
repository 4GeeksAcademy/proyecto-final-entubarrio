import React, { useState } from 'react';
import "../../styles/tienda.css";
import Info from './info';
import Info2 from './info2';
import Info3 from './info3';

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
                    {categorias.map((categoria) =>{
					return (
						<option value={categoria}/>
					)
				})}
                    <option value="opcion1">Verduras</option>
                    <option value="opcion2">Frutas</option>
                </select>
            </div>
            <div className="cardcontainertiendas">
                {/* Mostrar las tarjetas correspondientes a la opción seleccionada */}
                {opcionSeleccionada === 'opcion1' && (
                    <>
                        <Info2 titulo="Pan 1" texto="description" precio="12€" />
                        <Info2 titulo="Pan 2" texto="description" precio="13€" />
                        <Info2 titulo="Pan 3" texto="description" precio="14€" />
                        <Info2 titulo="Pan 4" texto="description" precio="15€" />
                    </>
                )}
                {opcionSeleccionada === 'opcion2' && (
                    <>
                        <Info3 titulo="Dulce 1" texto="description" precio="15€" />
                        <Info3 titulo="Dulce 2" texto="description" precio="16€" />
                        <Info3 titulo="Dulce 3" texto="description" precio="17€" />
                        <Info3 titulo="Dulce 4" texto="description" precio="18€" />
                    </>
                )}
            </div>
        </div>
    );
};

export default TusCategoriasTienda;
