import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { TodasTiendas } from "../component/cardTodasTiendas";
import CategoriasTiendas from "../component/CategoriasTiendas"; 
import "../../styles/todastiendas.css";

export const PaginaTiendas = () => {
    const { store, actions } = useContext(Context);
    const [filteredTiendas, setFilteredTiendas] = useState([]);

    useEffect(() => {
        actions.getTiendas();
    }, []);

    useEffect(() => {
        setFilteredTiendas(store.tiendas);
    }, [store.tiendas]);

    const handleCategoriaChange = (categoria) => {
        if (categoria) {
            setFilteredTiendas(store.tiendas.filter(tienda => tienda.categoria_tienda === categoria));
        } else {
            setFilteredTiendas(store.tiendas);
        }
    };

    return (
        <div className="todas-tiendas">
            <h2 className="tittles text-center mt-4 mb-4">Tiendas</h2>
            <CategoriasTiendas onCategoriaChange={handleCategoriaChange} />
            <div className="cards row justify-content-center">
                {filteredTiendas.map((tienda) => {
                    return (
                        <div className="bg-body-secondary text col-md-3 col-sw-6 mb-4 d-flex justify-content-center custom-col"
                            key={tienda.id}>
                            <TodasTiendas
                                tienda={tienda}
                                nombre_tienda={tienda.nombre_tienda}
                                id={tienda.id}
                                descripcion_tienda={tienda.descripcion_tienda}
                                categoria_tienda={tienda.categoria_tienda}
                                direccion_tienda={tienda.direccion_tienda}
                                url_imagen_tienda={tienda.url_imagen_tienda}
                                isFavorito={tienda.isFavorito}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
