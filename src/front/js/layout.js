import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Nosotros } from "./pages/nosotros";
import injectContext from "./store/appContext";

import { InicioSesion } from "./pages/iniciosesion";
import { Tiendas } from "./pages/tiendas";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import {Infoproducto} from "./pages/infoproducto";

/* import Informacion from "./component/info"; AJUSTADO LAYOUT DE ADRI */

import { Productos } from "./pages/productos";
import { Vendedor } from "./pages/vendedor";

import { CreateUser } from "./pages/createuser";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Nosotros />} path="/nosotros" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />                     
                        <Route element={<InicioSesion />} path="/login" />
                        <Route element={<Tiendas />} path="/tiendas" />
                        <Route element={<CreateUser />} path="/createuser" />
                        <Route element={<Infoproducto />} path="/infoproducto" />
                        <Route element={<Productos />} path="/productos" />
                        <Route element={<Vendedor />} path="/vendedor" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
