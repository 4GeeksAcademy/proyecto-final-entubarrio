import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Nosotros = () => {

    return (
        <div className="text-center mt-5">
            <h1>En tu barrio</h1><br></br>
            <h3>¡En tu barrio te espera un mundo de posibilidades!</h3>

            <p>¿Cansado de las grandes superficies y de la impersonalidad de las compras online? 
                <br></br>En tu barrio queremos acercarte a los comercios de tu barrio, esos pequeños negocios llenos de encanto y
                <br></br>productos únicos que hacen de nuestra comunidad un lugar especial.</p>

            <h2>¿Qué te ofrece En tu barrio?</h2>
            <div className="lista-usuarios">
            <ul>
                <li><strong>Un centro comercial virtual para tu barrio: </strong>
                    Descubre una amplia variedad de productos y servicios a tu alcance,
                    desde tiendas de alimentación hasta librerías,
                    pasando por talleres de artesanía y mucho más. Todo ello, sin moverte de casa y con la comodidad de comprar online.</li>
                <li><strong>Apoya al comercio local: </strong>Cada compra que realizas En tu barrio contribuye a fortalecer la economía de tu barrio y a crear un futuro más sostenible.</li>
                <li><strong>Productos frescos y de calidad: </strong>Disfruta de productos frescos y de temporada de la mano de comercios locales que apuestan por la calidad y la atención al cliente.</li>
                <li><strong>Comodidad y rapidez: </strong>Recibe tus compras a domicilio o recógelas en la tienda, ¡tú eliges! Además, te ofrecemos un sistema de pago seguro y fácil de usar.</li>
                <li><strong>Precios competitivos: </strong>Compara precios y encuentra las mejores ofertas en productos de tus tiendas favoritas.</li>
            </ul>
            </div>
            <h2>¿Eres un pequeño comerciante?</h2>

            <p>Únete a En tu barrio y da a conocer tu negocio a miles de clientes potenciales. Crea tu perfil online de forma gratuita y empieza a vender tus productos desde hoy mismo.</p>

            <a href="/login">¡Regístrate ahora!</a>

            <p>Juntos, podemos construir un futuro mejor para nuestros barrios.</p>
            {/* <p>
				<img src={rigoImageUrl} />
			</p> */}

            <p>
                <a href="/login">
                    Ahora que nos conoces ¿Te gustaría crear una cuenta?
                </a>
            </p>
        </div>
    );
};