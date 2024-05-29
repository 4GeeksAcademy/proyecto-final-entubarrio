import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Info from "../component/info";
import CardProductos from "../component/cardProductos";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { TodosProductos } from "../component/cardTodosProductos";


export const Infoproducto = () => {

  const { store, actions } = useContext(Context);

  const params = useParams()
  useEffect(() => {
    actions.getProducto(params.id)
    actions.getProductosTienda(params.tienda_id);
  }, []);


  return (
    <>
      <div className="container mt-3" >
        <div className="card-body">
          <div><Info nombre_producto={store.producto.nombre_producto} key={store.producto.id} url_imagen_producto={store.producto?.url_imagen_producto} descripcion_producto={store.producto.descripcion_producto} precio={store.producto.precio} id={store.producto.id} nombre_tienda={store.producto.nombre_tienda} isFavorito={store.producto.isFavorito} /></div>
        </div>
      </div>
      <div className="container categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
        {store.productosTienda.map((producto) => {
          return (
            <TodosProductos nombre_producto={producto.nombre_producto} key={producto.id} id={producto.id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} nombre_tienda={producto.nombre_tienda} precio={producto.precio} tienda_id={producto.tienda_id} />
          )
        })}
      </div>
    </>
  );
};