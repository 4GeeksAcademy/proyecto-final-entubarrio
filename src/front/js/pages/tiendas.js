import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/tiendas.css";
import Card from "../component/cardTienda";

export const Tiendas = () => {
	const { store, actions } = useContext(Context);

	return (
        <div>
            <div className="title-shop">
                <div className="text-custom-tienda">
                <h1>Tiendas</h1>
                <p>Descripción de la tienda seleccionada por el usuario. En esta página el usuario podra ver los detalles de la tienda</p>
                </div>
                
                
            </div>    
            <div className="cardcontainer">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <div className="card1">
                            <Card titulo="Aleluya I" texto="Esta es la primera tarjeta y estoy muy contento" boton="Mágico"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card2">
                            <Card titulo="Aleluya II" texto="Esta es la segunda tarjeta y estoy very happy" boton="Maravilloso" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card3">
                            <Card titulo="Aleluya III" texto="Esta es la tercera tarjeta y estoy muy cool " boton="Sorprendente"/>  
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card4">
                            <Card titulo="Aleluya IV" texto="Esta es la cuarta tarjeta y estoy molo mucho" boton="Viva la vida" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};