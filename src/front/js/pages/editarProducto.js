import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import fruteria from "../../img/fruteria.jpg";
import { TodosProductosVendedor } from "../component/cardVendedorTodosProductos";
import "../../styles/vendedor.css";

export const editarProducto = () => {
    const { store, actions } = useContext(Context);

    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [categoriaProducto, setCategoriaProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [urlImagenProducto, setUrlImagenProducto] = useState("");

    const handleSubmit = async () => {
        // e.preventDefault();
        const success = await actions.editarProducto(nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto,token);
        if (token) {
            // Aquí puedes redirigir a la página de productos o mostrar un mensaje de éxito
            alert("Producto creado");
        } else {
            // Manejo de errores, como mostrar un mensaje al usuario
            alert("Error al crear el producto");
        }
    };

    // Comprobar si hay un token presente
    const token = localStorage.getItem("token");
    if (!token) {
        return <h2>No estás autorizado para acceder a esta página.</h2>;
    }

    const params = useParams()

    useEffect(() => {
		actions.getTienda(store.tienda.id)
        actions.getProducto(store.producto.id)
        actions.getCategoriasProductos()
	}, [])

    return (
        <>
            <div className="text-center mt-5 vendedor">
                <h2>Verduleria Paco</h2>
                <img src={fruteria} className="imagen-fruteria img-fluid w-150" alt="Foto Home" />
                <div className="vendedor row d-flex justify-content-center border-top mt-5">
                    <div className="titulovendedor-añadir-productos col-4 mt-4 ms-4">
                        <h2>Añade un producto</h2>
                    </div>
                    <div className="formulariovendedor col-4">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="nombreProducto" className="form-label"></label>
                                <input
                                    type="text"
                                    className="form-control vendedor"
                                    id="nombreProducto"
                                    placeholder="Nombre de producto"
                                    value={nombreProducto}
                                    onChange={(e) => setNombreProducto(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="descripcionProducto" className="form-label"></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcionProducto"
                                    placeholder="Descripción del producto"
                                    value={descripcionProducto}
                                    onChange={(e) => setDescripcionProducto(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="categoriaProducto" className="form-label"></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoriaProducto"
                                    placeholder="Categoria del producto (Por ejemplo: Frutas, Verduras, Pan, Dulces)"
                                    value={categoriaProducto}
                                    onChange={(e) => setCategoriaProducto(e.target.value)}
                                />
                            </div>
                            
                            <div className="">
                                <label htmlFor="precio" className="form-label"></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="precio"
                                        placeholder="Precio en €"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        step="1"
                                    />
                                </div>

                            
                            <div className="mb-4">
                                <label htmlFor="urlImagenProducto" className="form-label"></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="urlImagenProducto"
                                    placeholder="URL de la imagen del producto"
                                    value={urlImagenProducto}
                                    onChange={(e) => setUrlImagenProducto(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="boton vendedor mb-4">Añadir Producto</button>

                        </form>
                    </div>
                    <h2>Tus Productos</h2>
                    
                    <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
                        <TodosProductosVendedor />
                    </div>
                </div>
            </div>
        </>
    );
};

