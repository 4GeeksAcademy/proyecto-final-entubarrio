import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {

	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	function logout() {
		actions.logout();
		navigate("/");
		window.location.reload();
	}

	let token = localStorage.getItem("token")

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary py-2 border-bottom d-flex flex-column">
			<div className="container-fluid">
				<a className="navbar-brand ms-5" href="/"><i className="logo fa-solid fa-street-view "></i></a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<ul className="nav justify-content-center ms-5">
					<li className="nav-item border-end">
						<a className="nav-link active" aria-current="page" href="/">Home</a>
					</li>
					<li className="nav-item border-end">
						<a className="nav-link" href="/nosotros">Nosotros</a>
					</li>
					<li className="nav-item border-end">
						<a className="nav-link" href="/paginatiendas">Tiendas</a>
					</li>
					<li className="nav-item ">
						<a className="nav-link" href="/productos">Productos</a>
					</li>
					{token ? <li className="nav-item border-start">
						<a className="nav-link" href="/vendedor">Mi Tienda</a>
					</li> : null}
				</ul>
				{token ?
				<button type="button" className="btn btn-success me-5 my-3 rounded" onClick={logout}>Logout</button>
				: <Link to="/login">
					<button className="Login btn btn-success me-5 my-3" type="submit"><i className="fa-solid fa-circle-user fa-fade"></i>  Iniciar sesión</button>
				</Link>}
			</div>
			<a className="navbar-brand" href="/"><h1>En tu Barrio</h1></a>
		</nav>

	);
};
