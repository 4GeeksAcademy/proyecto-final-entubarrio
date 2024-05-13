import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="bottomSide bg-body-tertiary border-top py-3">
		<ul className="nav justify-content-center">
			<li className="nav-item border-end">
				<a className="nav-link active" aria-current="page" href="/">Home</a>
			</li>
			<li className="nav-item border-end">
				<a className="nav-link" href="/nosotros">Nosotros</a>
			</li>
			<li className="nav-item border-end">
				<a className="nav-link" href="/tiendas">Tiendas</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Productos</a>
			</li>
		</ul>
		<div className="d-flex justify-content-center py-3">
			<i class="fa-regular fa-copyright"> En tu barrio</i>
		</div>
	</footer>
);
