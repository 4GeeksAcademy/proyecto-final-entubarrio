import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Informacion from "../component/info";


export const Informacion_producto = ({ productoInfo }) => {

    const { store, actions } = useContext(Context)
  
    
  
    function producto() {
     
    }
  
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-text">holeeeeee</h5>
        
         </div>
      </div>
    );
  };