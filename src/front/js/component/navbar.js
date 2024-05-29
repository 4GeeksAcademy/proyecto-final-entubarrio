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
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor:"#F8F3D4"}}>
                <div className="box-nav container">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} alt="Logo" className="logo-nav" />
                    </a>
                    <button
                        className="navbar-toggler d-flex justify-content-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"><h6>Home</h6></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link border-start border-black" to="/nosotros"><h6>Nosotros</h6></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link border-start border-black" to="/paginatiendas"><h6>Tiendas</h6></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link border-start border-black" to="/productos"><h6>Productos</h6></Link>
                            </li>
                            {tipo_usuario === "vendedor" && token && (
                                <li className="nav-item border-start border-black">
                                    <a className="nav-link" href="/vendedor">Mi Tienda</a>
                                </li>
                            )}
                            {tipo_usuario === "particular" && token && (
                                <li className="nav-item border-start border-black">
                                    <a className="nav-link" href="/favoritos">Mis favoritos</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="boton-login d-flex justify-content-end">
                     {token ? (
                            <button
                                type="button"
                                className="btn btn-info me-5 my-3 rounded text-white" 
                                onClick={logout}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="Login btn btn-info my-3 text-white" type="submit"> 
                                    <i className="fa-solid fa-circle-user fa-fade"></i> Iniciar sesión
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container d-flex justify-content-center title-container border-bottom"> 
                <Link to="/"><img src={Letras} alt="Letras" className="logo-letra" /></Link>
            </div>
        </>
    );
};

//         <>
//             <nav className="navbar navbar-expand-lg py-2 navbar-container ">
//                 <div className="container">
//                     <a className="navbar-brand" href="/">
//                         <img src={Logo} alt="Logo" className="logo-nav" />
//                     </a>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
//                         <ul className="navbar-nav mx-auto">
//                             <li className="nav-item border-end border-black">
//                                 <a className="nav-link active" aria-current="page" href="/">Home</a>
//                             </li>
//                             <li className="nav-item border-end border-black">
//                                 <a className="nav-link" href="/nosotros">Nosotros</a>
//                             </li>
//                             <li className="nav-item border-end border-black">
//                                 <a className="nav-link" href="/paginatiendas">Tiendas</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="/productos">Productos</a>
//                             </li>
//                             {tipo_usuario === "vendedor" && token && (
//                                 <li className="nav-item border-start border-black">
//                                     <a className="nav-link" href="/vendedor">Mi Tienda</a>
//                                 </li>
//                             )}
//                             {tipo_usuario === "particular" && token && (
//                                 <li className="nav-item border-start border-black">
//                                     <a className="nav-link" href="/favoritos">Mis favoritos</a>
//                                 </li>
//                             )}
//                         </ul>
//                     </div>
//                     <div className="container boton-login d-flex justify-content-end me-5">
//                     {token ? (
//                             <button
//                                 type="button"
//                                 className="btn btn-info me-5 my-3 rounded text-white" 
//                                 onClick={logout}
//                             >
//                                 <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
//                             </button>
//                         ) : (
//                             <Link to="/login">
//                                 <button className="Login btn btn-info me-5 my-3 text-white" type="submit"> 
//                                     <i className="fa-solid fa-circle-user fa-fade"></i> Iniciar sesión
//                                 </button>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </nav>
            
//             <div className="d-flex justify-content-center border-bottom containerletra">
//             <Link to="/"><img src={Letras} alt="Letras" className="logo-letra" /></Link>
//             </div>
//         </>
//     );
// };