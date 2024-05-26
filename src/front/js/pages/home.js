import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import "../../styles/home.css";
import { TodosProductos } from "../component/cardTodosProductos";
import { TodasTiendas } from "../component/cardTodasTiendas";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CarruselHome from "../component/cardCarruselHome";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getTiendas();
        actions.getProductos();
        actions.getCategoriasProductos();
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
        <div className="home text-center mt-0">
            <p>
                <CarruselHome />
            </p>
            <h2>Selección de Tiendas</h2>
            <p>Aquí podrás encontrar una variedad de tiendas de tu barrio</p>
            <div className="categorias-home container-fluid mb-5">
                <Carousel 
                    responsive={responsive} 
                    customLeftArrow={<CustomLeftArrow />} 
                    customRightArrow={<CustomRightArrow />}
                >
                    {store.tiendas.map((tienda) => (
                        <TodasTiendas 
                            nombre_tienda={tienda.nombre_tienda} 
                            key={tienda.id} 
                            id={tienda.id} 
                            url_imagen_tienda={tienda.url_imagen_tienda} 
                            descripcion_tienda={tienda.descripcion_tienda} 
                            direccion_tienda={tienda.direccion_tienda} 
                        />
                    ))}
                </Carousel>
            </div>
            <h2>Selección de Productos</h2>
            <p>Aquí podrás encontrar una variedad de productos de tu barrio</p>
            <div className="categorias-home container-fluid mb-5">
                <Carousel 
                    responsive={responsive} 
                    customLeftArrow={<CustomLeftArrow />} 
                    customRightArrow={<CustomRightArrow />}
                >
                    {store.productos.map((producto) => (
                        <TodosProductos 
                            nombre_producto={producto.nombre_producto} 
                            key={producto.id} 
                            id={producto.id} 
                            url_imagen_producto={producto.url_imagen_producto} 
                            descripcion_producto={producto.descripcion_producto} 
                            precio={producto.precio} 
                            tienda_id={producto.tienda_id} 
                            nombre_tienda={producto.nombre_tienda} 
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};