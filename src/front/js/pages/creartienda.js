import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/creartienda.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const CrearTienda = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    // -----------------------------------------------------FUNCION addContact() ------------------------------------------//

    // ------------------------Modificar los datos del formulario JUNTO AL BODY DE FLUX----------------------------------//
    function handleSubmit(e) {
        e.preventDefault()
        const contact = {
            name,
            email,
            address,
            phone
        }
        actions.crearTienda(contact)
        navigate("/login")
        actions.getAllContacts()

        // store.contacts()
        // setFullName(""),
        // setEmail({}),
        // setAddress({}),
        // setPhone({})
        // console.log(fullName,email,phone,address);
    }

    return (
        <div className="container-fluid form-tienda">
            <h1 className="title-crear-tienda">Crea tu tienda</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label"> Nombre</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Nombre de Tienda" onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="exampleInputDescripcion" aria-describedby="emailHelp" placeholder="Descripcion de la tienda" onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="exampleInputCategoria" placeholder="Tipo de tienda" onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Dirección de su tienda" onChange={(event) => { setAddress(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Imagen</label>
                    <input type="url" className="form-control" id="imageUrl" placeholder="URL de la imagen de su tienda"
                        onChange={(event) => setImageUrl(event.target.value)}
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
