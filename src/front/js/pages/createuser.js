import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateUser = () => {

	const [tipoUsuario, setTipoUsuario] = useState("");
	// const [nombre_tienda, setNombre_tienda] = useState("");

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
		if ( tipoUsuario === "particular" && email === "" || password === "") {
			// Verificar campos completos
			Swal.fire({
				title: 'Error!',
				text: "Faltan datos para crear la cuenta",
				icon: 'error',
				confirmButtonText: 'OK'
			})
			return null;
		}
		if ( tipoUsuario === "empresa" && email === "" || password === "") {
			// Verificar campos completos
			Swal.fire({
				title: 'Error!',
				text: "Faltan datos para crear la cuenta",
				icon: 'error',
				confirmButtonText: 'OK'
			})
			return null;
		}
		// const data = {
		// 	email,
		// 	password,
		// 	...(tipoUsuario === "vendedor" && { nombre_tienda }),
		// };

		// Check if user already exists before attempting registration
		// const userExist = await actions.checkUserExists(email); // Assuming 'checkUserExists' exists

		// if (email) {
		//   // User already exists, display alert
		//   alert("El usuario con este correo electrónico ya esta registrado.");
		//   return null; // Prevent further processing if user already exists
		// }

		let isCreated;

		if (tipoUsuario === "vendedor" || "particular") {
			// Registro de usuario individual
			isCreated = await actions.createUser(email, password, tipoUsuario, navigate);
			if (isCreated){
			Swal.fire({
				icon: "success",
				title: isCreated,
				showConfirmButton: false,
				timer: 1500
			  });
			} else {
				// Registro de empresa
				Swal.fire({
					title: 'Error!',
					text: response.msg,
					icon: 'error',
					confirmButtonText: 'OK'
				})
				return null;
			}	
	}
}

	return (
		<div className="container inicio-sesion d-flex justify-content-center pt-4 pb-4" style={{backgroundColor:"#def4f5"}}>
            <div className="row justify-content-center">
				<h1 className="text-center">¡Únete a tu barrio!</h1>
				
				<div className="card col-10 col-sm-4 col-md-6 col-lg-6 col-xl-5 mb-3 mt-2 p-3">
                    <div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<h1>Crea Tu Cuenta</h1>
							</div>
							<div className="">
								<label htmlFor="exampleInputEmail1" className="form-label">Selecciona una cuenta de particular o empresa</label>
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
								<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@address.com" onChange={(event) => { setEmail(event.target.value) }} />
							</div>
							<div className="mb-4">
								<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
								<input type="password" className="form-control" id="exampleInputPassword1" placeholder="***********" onChange={(event) => { setPassword(event.target.value) }} />
							</div>
							{/* {tipoUsuario === "vendedor" && (
								<div className="mb-3">
									<label
										htmlFor="nombreTienda"
										className="form-label"
									>
										Nombre de la Empresa
									</label>
									<input
										type="text"
										className="form-control"
										id="nombreTienda"
										placeholder="Nombre de tu empresa"
										onChange={(event) => {
											setNombre_tienda(event.target.value);
										}}
									/>
								</div>
							)} */}
							<button type="submit" className="boton mb-1">Crear Cuenta</button>
							<div className="form-text mb-4">Creando una cuenta aceptas nuestros terminos y condiciones de uso.</div>
							<div className="form-text d-flex justify-content-center">¿Ya tienes una cuenta?</div>
							<div className="form-text d-flex justify-content-center"><Link to="/login">Inicia sesión</Link></div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};