import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const MiTienda = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        nombre_tienda: "",
        descripcion_tienda: "",
        categoria_tienda: "",
        direccion_tienda: "",
        url_imagen_tienda: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.agregarTienda(formData);
        if (success) {
            navigate("/tiendas");
        }
    };

    return (
        <div className="">
            <div className="text-center p-5">
                <h2 className="p-2">Tus Tiendas</h2>
                <p>¿Quieres añadir tienda en tu barrio y gestionar tienda de manera eficiente? <br /> Descubre cómo nuestra plataforma te facilita el proceso.</p>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4">
                    <h2>Añade un producto</h2>
                </div>
                <div className="col-4">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="nombre_producto" className="form-label"></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre_producto" 
                                placeholder="Nombre de producto"
                                value={formData.nombre_producto}
                                onChange={(event) => setFormData({ ...formData, nombre_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="descripcion_producto" className="form-label"></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="descripcion_producto" 
                                placeholder="Descripción de producto"
                                value={formData.descripcion_producto}
                                onChange={(event) => setFormData({ ...formData, descripcion_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="categoria_producto" className="form-label"></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="categoria_producto" 
                                placeholder="Categoría de producto"
                                value={formData.categoria_producto}
                                onChange={(event) => setFormData({ ...formData, categoria_producto: event.target.value })}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="precio" className="form-label"></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="precio" 
                                placeholder="Precio"
                                value={formData.precio}
                                onChange={(event) => setFormData({ ...formData, precio: event.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="url_imagen_producto" className="form-label"></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="url_imagen_producto" 
                                placeholder="Foto"
                                value={formData.url_imagen_producto}
                                onChange={(event) => setFormData({ ...formData, url_imagen_producto: event.target.value })}
                            />
                        </div>
                        <button type="submit" className="boton mb-4">Guardar</button>
                    </form>
                </div>
            </div>
            <div className="text-center p-5">
                <h2 className="p-2">Gestiona tus Tiendas</h2>
                <p>Descubre cómo gestionar tienda de manera eficiente, directamente en tu barrio. <br /> Simplifica tus operaciones y potencia tu negocio local.</p>
            </div>
			<div className="categorias-home container d-flex mb-5 justify-content-space-evenly" style={{ overflowX: "scroll" }}>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Fruteria Juani</h3>
						<p className="text-black text-xs">Frutas de temporada</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Verduras Paco</h3>
						<p className="text-black text-xs">Verduras y Hortalizas</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
					<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Pan para hoy</h3>
						<p className="text-black text-xs">Pan casero</p>
					</div>
				</div>
				<div className="carrusel-home w-1/3 h-64 bg-zinc-800 flex-shrink-0 relative">
				<a href="/tiendas"><img src="https://placehold.co/200x200" alt="Image 1" className="w-full h-full object-cover" /></a>
					<div className="absolute bottom-0 left-0 right-0 p-2">
						<h3 className="text-black text-sm font-bold">Pasteles Goloso</h3>
						<p className="text-black text-xs">Dulces y tartas</p>
					</div>
				</div>
			</div>
        </div>
    );
};