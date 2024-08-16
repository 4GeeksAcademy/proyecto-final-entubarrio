import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import Logo from "../../img/unioncolor.png";
import Letras from "../../img/LETRAS.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function logout() {
        actions.logout();
        navigate("/");
        window.location.reload();
    }

    let token = localStorage.getItem("token");
    let tipo_usuario = localStorage.getItem("tipo_usuario");

    return (
        <>
            <nav className="navbar navbar-expand-lg container pt-3" style={{ backgroundColor: "#F8F3D4" }}>
                <div className="container justify-content-between">
                    <div className="logo-barrio ms-2">
                        <a className="navbar-brand" href="/">
                            <img src={Logo} alt="Logo" className="logo-nav" />
                        </a>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="container d-flex justify-content-center">
                        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0 align-items-start">
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
                                {tipo_usuario === "vendedor" && token && (
                                    <li className="nav-item border-start border-black">
                                        <a className="nav-link" href="/vendedor"><h6><strong>Mi Tienda</strong></h6></a>
                                    </li>
                                )}
                                {tipo_usuario === "particular" && token && (
                                    <li className="nav-item border-start border-black">
                                        <a className="nav-link" href="/favoritos"><h6><strong>Mis favoritos</strong></h6></a>
                                    </li>
                                )}

                            </ul>
                        </div>
                        <div className="d-flex" role="search">
                            {token ? (
                                <>
                                    {tipo_usuario === "particular" && token ? (
                                        <Link to="/">
                                            <div className="btn-group my-3 me-1">
                                                <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa-solid fa-circle-user fa-fade"></i> Mi Perfil
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" to="/datos-usuario">Mis datos</Link></li>
                                                    <li><Link className="dropdown-item" to="/another-action">Reservas</Link></li>
                                                    <li><Link className="dropdown-item" to="/something-else">Favoritos</Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={logout}
                                                        >
                                                            Cerrar sesión
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Link>
                                    ) : null}
                                    <button
                                        type="button"
                                        className="btn btn-info my-3 rounded text-white"
                                        onClick={logout}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <Link to="/login">
                                    <button className="Login btn btn-info my-3 text-white" type="submit">
                                        <i className="fa-solid fa-circle-user fa-fade"></i> Iniciar sesión
                                    </button>
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
            </nav>
            <div className="container d-flex justify-content-center title-container border-bottom">
                <Link to="/"><img src={Letras} alt="Letras" className="logo-letra" /></Link>
            </div>
        </>
    );
};
