import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import imagenbarrio from "../../img/Barrio-Gracia-Barcelona_1394570563_109101042_667x375.jpg";
import "../../styles/home.css";
import { TodosProductos } from "../component/cardTodosProductos";
import { TodasTiendas } from "../component/cardTodasTiendas";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CategoriasTiendas from "../component/CategoriasTiendas";
import CategoriasTodosProductos from "../component/CategoriasTodosProductos";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [filteredTiendas, setFilteredTiendas] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);

    useEffect(() => {
        actions.getTiendas();
        actions.getProductos();
        actions.getCategoriasProductos();
        actions.getCategoriasTiendas();
    }, []);

    useEffect(() => {
        setFilteredTiendas(store.tiendas);
        setFilteredProductos(store.productos);
    }, [store.tiendas, store.productos]);

    const handleCategoriaTiendasChange = (categoria) => {
        if (categoria) {
            setFilteredTiendas(store.tiendas.filter(tienda => tienda.categoria_tienda === categoria));
        } else {
            setFilteredTiendas(store.tiendas);
        }
    };

    const handleCategoriaProductosChange = (categoria) => {
        if (categoria) {
            setFilteredProductos(store.productos.filter(producto => producto.categoria_producto === categoria));
        } else {
            setFilteredProductos(store.productos);
        }
    };

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
                <img 
                    src={imagenbarrio}
                    className="imagen-barrio img-fluid w-150"
                    alt="Foto Home" 
                />
            </p>
            <h2>Selección de Tiendas</h2>
            <p>Aquí podrás encontrar una variedad de tiendas de tu barrio</p>
            <CategoriasTiendas onCategoriaChange={handleCategoriaTiendasChange} />
            <div className="categorias-home container-fluid mb-5">
                <Carousel 
                    responsive={responsive} 
                    customLeftArrow={<CustomLeftArrow />} 
                    customRightArrow={<CustomRightArrow />}
                >
                    {filteredTiendas.map((tienda) => (
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
            <CategoriasTodosProductos onCategoriaChange={handleCategoriaProductosChange} />
            <div className="categorias-home container-fluid mb-5">
                <Carousel 
                    responsive={responsive} 
                    customLeftArrow={<CustomLeftArrow />} 
                    customRightArrow={<CustomRightArrow />}
                >
                    {filteredProductos.map((producto) => (
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
