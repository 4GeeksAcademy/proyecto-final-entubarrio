import React, { useContext, useEffect } from "react";
import Info from "../component/info";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { TodosProductos } from "../component/cardTodosProductos";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const Infoproducto = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProducto(params.id);
    actions.getProductosTienda(params.tienda_id);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button onClick={onClick} className="btn btn-circle btn-dark opacity-75 custom-arrow left-arrow">
        <FaArrowLeft />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button onClick={onClick} className="btn btn-circle btn-dark opacity-75 custom-arrow right-arrow">
        <FaArrowRight />
      </button>
    );
  };

  return (
    <>
      <div className="container pt-3 " style={{ backgroundColor: "#def4f5" }}>
        <div className="card-body">
          <div>
            <Info 
              nombre_producto={store.producto.nombre_producto} 
              key={store.producto.id} 
              url_imagen_producto={store.producto?.url_imagen_producto} 
              descripcion_producto={store.producto.descripcion_producto} 
              precio={store.producto.precio} 
              id={store.producto.id} 
              nombre_tienda={store.producto.nombre_tienda} 
              isFavorito={store.producto.isFavorito} 
            />
          </div>
        </div>
      </div>
      <div className="container categorias-home container-fluid mb-5">
        <Carousel 
          responsive={responsive} 
          customLeftArrow={<CustomLeftArrow />} 
          customRightArrow={<CustomRightArrow />}
        >
          {store.productosTienda.map((producto) => (
            <TodosProductos 
              nombre_producto={producto.nombre_producto} 
              key={producto.id} 
              id={producto.id} 
              url_imagen_producto={producto.url_imagen_producto} 
              descripcion_producto={producto.descripcion_producto} 
              nombre_tienda={producto.nombre_tienda} 
              precio={producto.precio} 
              tienda_id={producto.tienda_id} 
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};