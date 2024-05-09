import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {

	const navigate = useNavigate()



	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary py-2 border-bottom">
			<div className="container-fluid">
				<a className="navbar-brand ms-5" href="/"><i className="logo fa-solid fa-street-view "></i></a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<ul className="nav justify-content-center">
					<li className="nav-item border-end">
						<a className="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li className="nav-item border-end">
						<a className="nav-link" href="/demo">Nosotros</a>
					</li>
					<li className="nav-item border-end">
						<a className="nav-link" href="/tiendas">Tiendas</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Productos</a>
					</li>
				</ul>
				<Link to="/login">
					<button className="Login btn btn-success me-5 my-3" type="submit"><i className="fa-solid fa-circle-user fa-fade"></i>  Iniciar sesión</button>
				</Link>
			</div>
		</nav>
	);
};
