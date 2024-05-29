import React, { Component } from "react";
import Logo from "../../img/unioncolor.png";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center border-top">

		<ul className="nav justify-content-center">
			<li className="nav-item">
				<Link className="nav-link" to="/"><h6><strong>Home</strong></h6></Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link border-start border-black" to="/nosotros"><h6><strong>Nosotros</strong></h6></Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link border-start border-black" to="/paginatiendas"><h6><strong>Tiendas</strong></h6></Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link border-start border-black" to="/productos"><h6><strong>Productos</strong></h6></Link>
			</li>
		</ul>
		<a className="footer-img" href="/">
			<img src={Logo} alt="Logo" className="logo-footer" />
		</a>
	</footer>
);
