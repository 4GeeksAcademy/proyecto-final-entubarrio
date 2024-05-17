import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";

export const TodosProductosVendedor = ({ id }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamar a la función para obtener los productos de la tienda específica
        actions.getProductosTienda(id);
    }, [id]);

    return (
        <div>
            <h2>Seleccion de Productos</h2>
            <p>Aquí podrás encontrar una variedad de productos de tu barrio</p>
            <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
                {store.productosTienda ? (
                    store.productosTienda.map(producto => (
                        <TodosProductos
                            key={producto.id}
                            nombre_producto={producto.nombre_producto}
                            id={producto.id}
                            url_imagen_producto={producto.url_imagen_producto}
                            descripcion_producto={producto.descripcion_producto}
                            precio={producto.precio}
                        />
                    ))
                ) : (
                    <div className="en-obras">
                        <i className="fas fa-tools icono-en-obras"></i>
                        <h3 className="text-center">En obras</h3>
                    </div>
                )}
            </div>
        </div>
    );
};
