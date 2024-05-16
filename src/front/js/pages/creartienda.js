import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/creartienda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const CrearTienda = () => {

    const [nombre_tienda, setNombre_Tienda] = useState("");
    const [descripcion_tienda, setDescripcion_Tienda] = useState("");
    const [categoria_tienda, setCategoria_Tienda] = useState("");
    const [direccion_tienda, setDireccion_Tienda] = useState("");
    const [url_imagen_tienda, setUrl_Imagen_Tienda] = useState("");


    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()
        // const crearTienda = {
        //     name,
        //     email,
        //     address,
        //     phone
        // }
        actions.crearTienda(nombre_tienda, descripcion_tienda, categoria_tienda, direccion_tienda, url_imagen_tienda)
        console.log(actions.crearTienda());
        navigate("/login")
        // actions.getProducts()
    }


    // tiendaCreada = actions.crearTienda(data);

    return (
        <div className="container-fluid form-tienda">
            <h1 className="title-crear-tienda">Crea tu tienda</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> Nombre</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Nombre de Tienda" 
                    onChange={(event) => { setNombre_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="exampleInputDescripcion" aria-describedby="emailHelp" placeholder="Descripcion de la tienda" 
                    onChange={(event) => { setDescripcion_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="exampleInputCategoria" placeholder="Tipo de tienda" 
                    onChange={(event) => { setCategoria_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Dirección de su tienda" 
                    onChange={(event) => { setDireccion_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Imagen</label>
                    <input type="url" className="form-control" id="imageUrl" placeholder="URL de la imagen de su tienda"
                    onChange={(event) => { setUrl_Imagen_Tienda(event.target.value) }}
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
