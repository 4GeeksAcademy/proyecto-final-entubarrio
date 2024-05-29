import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/SIMBOLOCOLOR.png";
import "../../styles/nosotros.css";
import "../../img/01woman.jpg"
import "../../img/02woman.jpg"


export const Nosotros = () => {

    return (
        <div className="nosotros-body text-center pt-5 pb-5 container" style={{backgroundColor:"#def4f5"}}>

            <h1>Bienvenido</h1><br></br>

            <h3 className="text-danger-emphasis pb-3">¡En tu barrio te espera un mundo de posibilidades!</h3>
            <div className=" text-center  pt-3 pb-3  ">
            </div>



            <div className="clearfix container">
                <img src="01woman.jpg" className=" img-nosotros col-md-6 float-md-start mb-3 ms-md-4 " alt="..." />

                <p className="text-danger-emphasis p-3">
                    <strong>¿Cansado de las grandes superficies y de la impersonalidad de las compras online?</strong>
                </p>

                <p className="m-3">
                    En tu barrio queremos acercarte a los comercios de tu barrio, esos pequeños negocios llenos de encanto y
                    productos únicos que hacen de nuestra comunidad un lugar especial.
                </p>

            </div>




            <h2 className="text-danger-emphasis p-3">¿Qué te ofrece En tu barrio?</h2>

            <br></br>

            <div className="clearfix text-start">
                <img src="02woman.jpg" className=" img-nosotros2 col-md-6 float-md-end mb-3 ms-md-4 " alt="..." />

                <p className="text-danger-emphasis p-3">
                    <strong>Un centro comercial virtual para tu barrio: </strong>
                    Descubre una amplia variedad de productos y servicios a tu alcance,
                    desde tiendas de alimentación hasta librerías,
                    pasando por talleres de artesanía y mucho más. Todo ello, sin moverte de casa y con la comodidad de comprar online.
                </p>

                <p className="text-danger-emphasis m-3">
                    <strong>Apoya al comercio local: </strong>Cada compra que realizas En tu barrio contribuye a fortalecer la economía de tu barrio y a crear un futuro más sostenible.
                </p>
                <p className="text-danger-emphasis m-3">
                    <strong>Productos frescos y de calidad: </strong>Disfruta de productos frescos y de temporada de la mano de comercios locales que apuestan por la calidad y la atención al cliente.
                </p>

                <p className="text-danger-emphasis m-3">
                    <strong>Precios competitivos: </strong>Compara precios y encuentra las mejores ofertas en productos de tus tiendas favoritas.
                </p>

            </div>

            <br></br>
            <br></br>
            <h2>¿Eres un pequeño comerciante?</h2>
            <br></br>

            <p>Únete a En tu barrio y da a conocer tu negocio a miles de clientes potenciales. <br></br>
                Crea tu perfil online de forma gratuita y empieza a vender tus productos desde hoy mismo.</p>

            <a href="/createuser"><h4>¡Regístrate ahora!</h4></a>

            <h6>Juntos, podemos construir un futuro mejor para nuestros barrios.</h6>
            <a className="navbar-brand" href="/">
                <img src={Logo} alt="Logo" className="logo-nos" />
            </a>
        </div>
    );
};