import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import "../../styles/cardCompararProductos.css";

const CompararProductos = () => {
  const { store, actions } = useContext(Context);
  const [producto1, setProducto1] = useState(null);
  const [producto2, setProducto2] = useState(null);
  const [comparar, setComparar] = useState(false);

  useEffect(() => {
    actions.getProductos();
  }, []);

  const obtenerColorDeFondo = (productoId) => {
    if (comparar && producto1 && producto2) {
      const precio1 = store.productos.find(p => p.id === parseInt(producto1)).precio;
      const precio2 = store.productos.find(p => p.id === parseInt(producto2)).precio;

      if (productoId === producto1 && precio1 < precio2) {
        return 'bg-success text-white';
      } else if (productoId === producto2 && precio2 < precio1) {
        return 'bg-success text-white';
      } else if (productoId === producto1 && precio1 > precio2) {
        return 'bg-danger text-white';
      } else if (productoId === producto2 && precio2 > precio1) {
        return 'bg-danger text-white';
      }
    }
    return 'bg-white';
  };

  const handleComparar = () => {
    if (producto1 && producto2) {
      setComparar(true);
    } else {
      alert('Por favor, seleccione dos productos para comparar.');
    }
  };

  return (
    <div className='Comparador mt-4'>
      <div className='text-danger text-center m-2'>
        <h1>Comparador de precios</h1>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='m-3'>
          <select className="form-select" onChange={e => setProducto1(e.target.value)}>
            <option value="">Seleccione un producto</option>
            {store.productos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre_producto}
              </option>
            ))}
          </select>
          <div className={`card mb-3 ${comparar ? obtenerColorDeFondo(producto1) : 'bg-white'}`}>
            {producto1 && (
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <div className="image-container">
                    <img
                      src={store.productos.find(p => p.id === parseInt(producto1)).url_imagen_producto}
                      className="img-fluid" alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{store.productos.find(p => p.id === parseInt(producto1)).nombre_producto}</h5>
                    <p className="card-text">{store.productos.find(p => p.id === parseInt(producto1)).descripcion_producto}</p>
                    <h4 className="card-text">{store.productos.find(p => p.id === parseInt(producto1)).precio}€</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='m-3'>
          <select className="form-select" onChange={e => setProducto2(e.target.value)}>
            <option value="">Seleccione un producto</option>
            {store.productos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre_producto}
              </option>
            ))}
          </select>
          <div className={`card mb-3 ${comparar ? obtenerColorDeFondo(producto2) : 'bg-white'}`}>
            {producto2 && (
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <div className="image-container">
                    <img
                      src={store.productos.find(p => p.id === parseInt(producto2)).url_imagen_producto}
                      className="img-fluid" alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{store.productos.find(p => p.id === parseInt(producto2)).nombre_producto}</h5>
                    <p className="card-text">{store.productos.find(p => p.id === parseInt(producto2)).descripcion_producto}</p>
                    <h4 className="card-text">{store.productos.find(p => p.id === parseInt(producto2)).precio}€</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center mb-4'>
        <button className='btn btn-success' onClick={handleComparar}>Comparar</button>
      </div>
    </div>
  );
}

export default CompararProductos;