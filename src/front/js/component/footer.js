import React, { Component } from "react";
import Logo from "../../img/unioncolor.png";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center border-top">
		
		<ul className="nav justify-content-center">
			<li className="nav-item border-end border-black">
				<a className="nav-link active" aria-current="page" href="/">Home</a>
			</li>
			<li className="nav-item border-end border-black">
				<a className="nav-link" href="/nosotros">Nosotros</a>
			</li>
			<li className="nav-item border-end border-black">
				<a className="nav-link" href="/tiendas">Tiendas</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Productos</a>
			</li>
		</ul>
		<a className="footer-img" href="/">
                        <img src={Logo} alt="Logo" className="logo-footer" />
                    </a>
	</footer>
);
