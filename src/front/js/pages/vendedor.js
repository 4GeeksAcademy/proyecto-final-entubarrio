/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import fruteria from "../../img/fruteria.jpg";
import "../../styles/vendedor.css";

export const Vendedor = () => {

	const [nombre_producto, setNombre_producto] = useState("")
    const [descripcion_producto, setDescripcion_producto] = useState("")
    const [categoria_producto, setCategoria_producto] = useState("")
    const [url_imagen_producto, setUrl_imagen_producto] = useState("")

	const { store, actions } = useContext(Context);

	const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.agregarProducto();
        if (success) {
            navigate("/productos");
			store.productos();
        }
    };

	return (
		<>
		<div className="text-center mt-5">
			<h2>Fruteria Juani</h2>
			<p></p>
				<img src={fruteria}
					className="imagen-fruteria img-fluid w-150"
					alt="Foto Home" />
			 <div className="row d-flex justify-content-center border-top mt-5">
                <div className="titulo-añadir-productos col-4 mt-4 ms-4">
                    <h2>Añade un producto</h2>
                </div>
                <div className="formulario col-4">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="nombre_producto" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre_producto"
                                placeholder="Nombre de producto"
                                // value={formData.nombre_producto}
                                // onChange={(event) => setFormData({ ...formData, nombre_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="descripcion_producto" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion_producto"
                                placeholder="Descripción de producto"
                                // value={formData.descripcion_producto}
                                // onChange={(event) => setFormData({ ...formData, descripcion_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="categoria_producto" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoria_producto"
                                placeholder="Categoría de producto"
                                // value={formData.categoria_producto}
                                // onChange={(event) => setFormData({ ...formData, categoria_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="precio" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="precio"
                                placeholder="Precio"
                                // value={formData.precio}
                                // onChange={(event) => setFormData({ ...formData, precio: event.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="url_imagen_producto" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="url_imagen_producto"
                                placeholder="Foto"
                                // value={formData.url_imagen_producto}
                                // onChange={(event) => setFormData({ ...formData, url_imagen_producto: event.target.value })}
                            />
                        </div>
                        <button type="submit" className="boton mb-4">Guardar</button>
                    </form>
                </div>
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<h2>Nuestros de Productos</h2>
			<p>Aqui podras encontrar todos nuestros productos</p>
			<div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Frutas</h3>
						<p className="text-black text-xs">Frutas de temporada</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Verduras</h3>
						<p className="text-black text-xs">Verduras y Hortalizas</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
					<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Pan</h3>
						<p className="text-black text-xs">Pan casero</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Dulces</h3>
						<p className="text-black text-xs">Dulces y tartas</p>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}; */

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import fruteria from "../../img/fruteria.jpg";
import "../../styles/vendedor.css";

export const Vendedor = () => {
    const { actions } = useContext(Context);

    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [categoriaProducto, setCategoriaProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [urlImagenProducto, setUrlImagenProducto] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.crearNuevoProducto(nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto,token);
        if (token) {
            // Aquí puedes redirigir a la página de productos o mostrar un mensaje de éxito
            alert(" Yupiii!!! Producto creado");
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
                                <label htmlFor="nombreProducto" className="form-label">Nombre de producto</label>
                                <input
                                    type="text"
                                    className="form-control vendedor"
                                    id="nombreProducto"
                                    value={nombreProducto}
                                    onChange={(e) => setNombreProducto(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="descripcionProducto" className="form-label">Descripción de producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcionProducto"
                                    value={descripcionProducto}
                                    onChange={(e) => setDescripcionProducto(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="categoriaProducto" className="form-label">Categoría de producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoriaProducto"
                                    value={categoriaProducto}
                                    onChange={(e) => setCategoriaProducto(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="urlImagenProducto" className="form-label">Foto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="urlImagenProducto"
                                    value={urlImagenProducto}
                                    onChange={(e) => setUrlImagenProducto(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="boton mb-4">Guardar</button>
                        </form>
                    </div>
                    <h2>Nuestros de Productos</h2>
                    <p>Aqui podras encontrar todos nuestros productos</p>
                    <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
                        <div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
                            <a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                                <h3 className="text-black text-sm font-bold">Frutas</h3>
                                <p className="text-black text-xs">Frutas de temporada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

