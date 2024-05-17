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
            {store.productosTienda ? (
                store.productosTienda.map(producto => (
                    <div className="grid-container d-flex mb-2 mt-2 justify-content-center" style={{ overflowBlock: "scroll" }} key={producto.id}>
                        <p>ESTO ES UN COMPONENTE</p>
                        <p>Aquí se renderizarán en breve (o eso espero) los productos de la tienda específica</p>
                        <a href="/infoproducto"><img src={"https://cdn-icons-png.freepik.com/256/12309/12309534.png?uid=R149155504&ga=GA1.1.2047492528.1715896395&semt=ais_hybrid"} alt="Imagen del producto" className="img-todos-productos w-20 h-20 object-fit" /></a>
                        <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                                <h4 className="text-black text-sm font-bold">{producto.nombre_producto}</h4>
                                <p className="text-black text-xs">{producto.descripcion_producto}</p>
                                <p className="text-black text-xs">{producto.url_imagen_producto}</p>
                                <h5 className="text-black">{producto.precio}</h5>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="en-obras">
                    <i className="fas fa-tools icono-en-obras"></i>
                    <h3 className="text-center">En obras</h3>
                </div>
            )}
        </div>
    );
};