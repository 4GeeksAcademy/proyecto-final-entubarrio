import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/creartienda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const EditarTienda = () => {

    const { store, actions } = useContext(Context)

    const [nombre_tienda, setNombre_Tienda] = useState(store.tienda?.nombre_tienda);
    const [descripcion_tienda, setDescripcion_Tienda] = useState(store.tienda?.descripcion_tienda);
    const [categoria_tienda, setCategoria_Tienda] = useState(store.tienda?.categoria_tienda);
    const [direccion_tienda, setDireccion_Tienda] = useState(store.tienda?.direccion_tienda);
    const [url_imagen_tienda, setUrl_Imagen_Tienda] = useState(store.tienda?.url_imagen_tienda);


    const token = localStorage.getItem("token");


    const navigate = useNavigate()
    
    function handleSubmit(e) {
        e.preventDefault()
        
        actions.editarTienda(
            nombre_tienda, 
            descripcion_tienda, 
            categoria_tienda, 
            direccion_tienda, 
            url_imagen_tienda,
            token);
        navigate("/vendedor")
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tienda editada",
            showConfirmButton: false,
            timer: 2000
          });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
		actions.getTiendaVendedor(token);
	}, [])

    return (
        <div className="container-fluid form-tienda">
            <h1 className="title-crear-tienda">Edita tu tienda</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> Nombre</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Nombre de Tienda"  value={nombre_tienda}
                    onChange={(event) => { setNombre_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="exampleInputDescripcion" aria-describedby="emailHelp" placeholder="Descripcion de la tienda" value={descripcion_tienda} 
                    onChange={(event) => { setDescripcion_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="exampleInputCategoria" placeholder="Tipo de tienda" value={categoria_tienda}
                    onChange={(event) => { setCategoria_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Dirección de su tienda" value={direccion_tienda}
                    onChange={(event) => { setDireccion_Tienda(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Imagen</label>
                    <input type="url" className="form-control" id="imageUrl" placeholder="URL de la imagen de su tienda" value={url_imagen_tienda}
                    onChange={(event) => { setUrl_Imagen_Tienda(event.target.value) }}
                    />
                </div>
                <button type="submit" className="guardar btn btn-primary">Guardar</button>

            </form>
            <Link to="/vendedor">
                <span className="mt-3 mb-0 h5">Vuelve a tu tienda</span>
            </Link>
        </div>
    );
};
