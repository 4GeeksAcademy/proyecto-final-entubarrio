import React from 'react';
import "../../styles/cardCompararProductos.css";

const CompararProductos = () => {
  return (
    <div className='Comparador'>
        <div className='text-danger text-center m-2'>
            <h1>
                Comparar productos
            </h1>
        </div>
        <div className='d-flex justify-content-center'>
            <div className='m-3'>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="https://via.placeholder.com/200" class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Nombre del producto</h5>
                            <p class="card-text">Nombre de la tienda</p>
                            <p class="card-text">Precio</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-3'>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="https://via.placeholder.com/200" class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Nombre del producto</h5>
                            <p class="card-text">Nombre de la tienda</p>
                            <p class="card-text">Precio</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center mb-4'>
            <button className='btn btn-success'>
                Comparar
            </button>
        </div>
    </div>
  );


}

export default CompararProductos