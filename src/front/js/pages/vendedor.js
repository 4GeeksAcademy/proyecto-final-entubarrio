import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import fruteria from "../../img/fruteria.jpg";
import { TodosProductosVendedor } from "../component/cardVendedorTodosProductos";
import "../../styles/vendedor.css";
import { EditarEliminarProductos } from "../component/cardEditarEliminarProductos";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const Vendedor = () => {
    const { store, actions } = useContext(Context);

    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [categoriaProducto, setCategoriaProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [urlImagenProducto, setUrlImagenProducto] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.crearNuevoProducto(nombreProducto, descripcionProducto, categoriaProducto, precio, urlImagenProducto, token);
        if (success) {
            // Aquí puedes redirigir a la página de productos o mostrar un mensaje de éxito
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto creado",
                showConfirmButton: false,
                timer: 2000
              });
        } else {
            // Manejo de errores, como mostrar un mensaje al usuario
            Swal.fire({
                title: 'Error!',
                text: "Error al crear el producto",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Comprobar si hay un token presente
    const token = localStorage.getItem("token");
    if (!token) {
        return <h2>No estás autorizado para acceder a esta página.</h2>;
    }

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        const token = localStorage.getItem("token");
		actions.getTiendaVendedor(token)
        actions.getAllVendedores()
        actions.getProductosVendedor(token)
	}, [])


    return (
        <>
            <div className="text-center mt-5 vendedor">
                <h2>{store.tienda?.nombre_tienda}</h2>
                <h5>{store.tienda?.descripcion_tienda}</h5>
                <img src={store.tienda?.url_imagen_tienda} className="imagen-vendedor img-fluid w-150" alt="Foto Home" />
                <div>
                    <button type="button" className="btn btn-success m-2" onClick={()=>{
                        actions.verTienda(store.tienda)
                        navigate("/editartienda")
                            }}><i className="fa fa-pen p-1" /></button>
                    <button type="button" className="btn btn-danger m-2"><i className="fa fa-trash p-1" onClick={()=>{
                        Swal.fire({
                            title: "¿Estás seguro?",
                            text: "¡Esta tienda promete!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "¡Si, elimínala!",
                            cancelButtonText: "¡No, espera!"
                          }).then((result) => {
                            if (result.isConfirmed) {
                                actions.deleteTienda(store.tienda?.nombre_tienda, token);
                                console.log(store.vendedores.id);
                                navigate("/creartienda")
                                Swal.fire({
                                title: "¡Eliminada!",
                                text: "Ya no tienes esta tienda.",
                                icon: "success"
                              });
                            }
                          });
                    }}/></button>
                </div>
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
                        {store.productosTienda.map((producto) =>{
                                return (
                                    <EditarEliminarProductos nombre_producto = {producto?.nombre_producto} key={producto?.id} id ={producto?.id} url_imagen_producto={producto?.url_imagen_producto} descripcion_producto={producto?.descripcion_producto} precio={producto?.precio} tienda_id={producto?.tienda_id} nombre_tienda={producto?.nombre_tienda} producto={producto}/>
                                )
                            })}
                        </div>
                </div>
            </div>
        </>
    );
};

