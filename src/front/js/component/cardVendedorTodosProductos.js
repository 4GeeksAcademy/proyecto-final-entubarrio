import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/todosproductos.css";

export const TodosProductosVendedor = ({url_imagen_producto, nombre_producto, descripcion_producto, id, precio}) => {
    const { store } = useContext(Context);

    return (
        <div>
            <div className="grid-container d-flex mb-2 mt-2 justify-content-center" style={{ overflowBlock: "scroll" }} key={id}>
                <p>ESTO ES UN COMPONENTE</p>
                <p>Aquí se renderizarán en breve (o eso espero) los productos de la tienda específica</p>
                <a href="/infoproducto"><img src={"https://cdn-icons-png.freepik.com/256/12309/12309534.png?uid=R149155504&ga=GA1.1.2047492528.1715896395&semt=ais_hybrid"} alt="Imagen del producto" className="img-todos-productos w-20 h-20 object-fit" /></a>
                <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                        <h4 className="text-black text-sm font-bold">{nombre_producto}</h4>
                        <p className="text-black text-xs">{descripcion_producto}</p>
                        <h5 className="text-black">{precio}</h5>
                        <h5 className="text-black">{store?.tiendas?.nombre_tienda}</h5> 
                    </div>
                </div>
            </div>
            <div className="en-obras">
                <i className="fas fa-tools icono-en-obras"></i>
                <h3 className="text-center">En obras</h3>
            </div>
        </div>
    );
};
