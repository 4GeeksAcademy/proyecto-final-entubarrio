import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/iniciosesion.css";

export const InicioSesion = () => {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    async function handleSubmit(e) {
		e.preventDefault();
		if (!tipoUsuario) {
			Swal.fire({
				title: 'Error!',
				text: 'Seleccione un tipo de usuario (Particular o Empresa)',
				icon: 'error',
				confirmButtonText: 'OK'
			})
			return null;
		}

		const response = await actions.login(email, password, tipoUsuario, navigate);
		if (!response) {
			Swal.fire({
				title: 'Hola!',
				text: response ? response : "Bienvenid@ a tu barrio!",
				icon: 'success',
				showConfirmButton: false,
                timer: 1500
			}); // Display error message using toast
            return;
		} else {
			// Successful login logic
			localStorage.setItem("token", response.access_token);
            Swal.fire({
				title: 'Error!',
				text: (response),
				icon: 'error',
				confirmButtonText: 'OK'
			}); // Display error message using toast
		}
	}


    return (
        <div className="container inicio-sesion d-flex justify-content-center pt-4 pb-4" style={{backgroundColor:"#def4f5"}}>
            <div className="row justify-content-center">
                <h1 className="text-center">¡Nos alegra volver a verte en tu barrio!</h1>

                <div className="card col-10 col-sm-4 col-md-6 col-lg-6 col-xl-5 mb-3 mt-2 p-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h1>Iniciar sesión</h1>
                            </div>
                            <div className="">
                                <label htmlFor="exampleInputEmail1" className="form-label">Accede con tu dirección de email y contraseña</label>
                                <div className="d-flex justify-content-around m-2">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="opcion"
                                            id="opcion1"
                                            value="particular"
                                            checked={tipoUsuario === "particular"}
                                            onChange={(event) => setTipoUsuario(event.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="opcion1">Soy un particular</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="opcion"
                                            id="opcion2"
                                            value="vendedor"
                                            checked={tipoUsuario === "vendedor"}
                                            onChange={(event) => setTipoUsuario(event.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="opcion2">Soy una empresa</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@address.com" autoComplete="username" onChange={(event) => { setEmail(event.target.value) }} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="***********" autoComplete="current-password" onChange={(event) => { setPassword(event.target.value) }} />
                            </div>
                            <button type="submit" className="boton mb-4">Iniciar Sesión</button>
                            <br />
                            <div className="form-text d-flex justify-content-center"><h5>¿No tienes cuenta?</h5></div>
                            <div className="form-text d-flex justify-content-center">
                                <Link to="/createuser">
                                    <h6>¡Únete a tu barrio!</h6>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
    );
};
