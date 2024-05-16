import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/tienda.css";
import CardPanaderias from "../component/cardTiendaPan";
import CardVerdulerias from "../component/cardTiendaDulces";
import TituloTienda from "../component/tituloTienda";
import TusCategoriasTienda from "../component/tusCategoriasTienda";
import MapaTienda from "../component/mapaTienda";

export const Tienda = () => {
    const { store, actions } = useContext(Context);

    // const params = useParams()
    // console.log(params.id);
    // useEffect(()=>{
	// 	actions.getCharacter(params.id)
	// },[]);
    // // const properties = store.character.properties
    // console.log(store.character);

    return (
        <div>
            <div className="title-shop">
                <div className="text-custom-tienda">

                <TituloTienda tiendaId={2}
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

