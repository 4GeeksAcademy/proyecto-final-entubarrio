import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center border-top">
		<p>
			<ul className="nav justify-content-center ms-5">
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
		</p>
	</footer>
);
