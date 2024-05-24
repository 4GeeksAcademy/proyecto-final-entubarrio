import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/creartienda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const CrearTienda = () => {

    const [nombre_tienda, setNombre_Tienda] = useState("");
    const [descripcion_tienda, setDescripcion_Tienda] = useState("");
    const [categoria_tienda, setCategoria_Tienda] = useState("");
    const [direccion_tienda, setDireccion_Tienda] = useState("");
    const [url_imagen_tienda, setUrl_Imagen_Tienda] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (!nombre_tienda || !descripcion_tienda || !categoria_tienda || !direccion_tienda || !url_imagen_tienda) {
            setErrorMessage("Por favor, completa todos los campos.");
            return; // Detener la ejecución si algún campo está vacío
        }
        
        actions.crearTienda(
            nombre_tienda,
            descripcion_tienda,
            categoria_tienda,
            direccion_tienda,
            url_imagen_tienda, navigate)
            .then(response => {console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response,
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch (error => {
                console.error(error)
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
    }

    return (
        <div className="container-fluid form-tienda">
            <h1 className="title-crear-tienda">Crea tu tienda</h1>
            <form onSubmit={handleSubmit} >
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> Nombre</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Nombre de Tienda"
                        onChange={(event) => { setNombre_Tienda(event.target.value); setErrorMessage(''); }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="exampleInputDescripcion" aria-describedby="emailHelp" placeholder="Descripcion de la tienda"
                        onChange={(event) => { setDescripcion_Tienda(event.target.value); setErrorMessage(''); }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="exampleInputCategoria" placeholder="Tipo de tienda"
                        onChange={(event) => { setCategoria_Tienda(event.target.value); setErrorMessage(''); }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Dirección de su tienda"
                        onChange={(event) => { setDireccion_Tienda(event.target.value); setErrorMessage(''); }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Imagen</label>
                    <input type="url" className="form-control" id="imageUrl" placeholder="URL de la imagen de su tienda"
                        onChange={(event) => { setUrl_Imagen_Tienda(event.target.value); setErrorMessage(''); }}
                    />
                </div>
                <button type="submit" className="guardar btn btn-primary">Guardar</button>

            </form>
            <Link to="/login">
                <span className="mt-3 mb-0 h5">Vuelve al registro</span>
            </Link>
        </div>
    );
};
