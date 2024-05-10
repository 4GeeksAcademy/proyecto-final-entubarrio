import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/tiendas.css";
import Card from "../component/cardTienda";
import TituloTienda from "../component/tituloTienda";

export const Tiendas = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="title-shop">
                <div className="text-custom-tienda">
                    
                    <TituloTienda titulo="Título Tienda"
                        descripcion="Aquí iría la descripción de la tienda y tal y tal"
                    />
                </div>


            </div>
            <div className="cardcontainer">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <div className="card1">
                            <Card titulo="Product name 1" texto="description" precio="12€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card2">
                            <Card titulo="Product name 2" texto="description" precio="13€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card3">
                            <Card titulo="Product name 3" texto="description" precio="14€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card4">
                            <Card titulo="Product name 4" texto="description" precio="15€" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

