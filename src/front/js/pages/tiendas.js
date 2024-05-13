import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/tiendas.css";
import Card from "../component/cardTienda";
import TituloTienda from "../component/tituloTienda";
import TusCategoriasTienda from "../component/tusCategoriasTienda";
import MapaTienda from "../component/mapaTienda";

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

            <div className="tus-productos">
                <div className="text-custom-tienda">
                    
                    <TusCategoriasTienda titulo="Título Tienda"
                        descripcion="Aquí iría la descripción de los productos"
                    />
                </div>


            </div>   
            <div className="cardcontainertiendas">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <div className="cardt1">
                            <Card titulo="Product name 1" texto="description" precio="12€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="cardt2">
                            <Card titulo="Product name 2" texto="description" precio="13€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="cardt3">
                            <Card titulo="Product name 3" texto="description" precio="14€" />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="cardt4">
                            <Card titulo="Product name 4" texto="description" precio="15€" />
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
         
            <div className="mapa-tienda">
                <div className="text-custom-tienda">
                    
                    <MapaTienda titulo="Título Tienda"
                        descripcion="Aquí iría la descripción del mapa"
                    />
                </div>
        </div>
        </div>
    );
};

