import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import { TodosProductos } from "../component/cardTodosProductos";
import CategoriasProductos from "../component/CategoriasProductos";
import "../../styles/todosproductos.css";

export const Productos = () => {
    const { store, actions } = useContext(Context);
    const [filteredProductos, setFilteredProductos] = useState([]);

    useEffect(() => {
        actions.getProductos();
    }, []);

    useEffect(() => {
        setFilteredProductos(store.productos);
    }, [store.productos]);

    const handleCategoriaChange = (categoria) => {
        if (categoria) {
            setFilteredProductos(store.productos.filter(producto => producto.categoria_producto === categoria));
        } else {
            setFilteredProductos(store.productos);
        }
    };

    return (
        <div className="todos-productos">
            <h2 className="tittles text-center mb-4">Productos</h2>
            <CategoriasProductos onCategoriaChange={handleCategoriaChange} />
            <div className="cards row justify-content-center">
                {filteredProductos.map((producto) => {
                    return (
                        <div className="bg-body-secondary text col-md-3 col-sw-6 mb-4 d-flex justify-content-center custom-col"
                            key={producto.id}>
                            <TodosProductos
                                producto={producto}
                                tienda_id={producto.tienda_id}
                                id={producto.id}
                                nombre_tienda={producto.nombre_tienda}
                                nombre_producto={producto.nombre_producto}
                                url_imagen_producto={producto.url_imagen_producto}
                                descripcion_producto={producto.descripcion_producto}
                                precio={producto.precio}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
