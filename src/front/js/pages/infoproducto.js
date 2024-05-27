import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Info from "../component/info";
// import CardTienda from "../component/cardTienda";
import CardProductos from "../component/cardProductos";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { TodosProductos } from "../component/cardTodosProductos";


export const Infoproducto = () => {

  const { store, actions } = useContext(Context);

  const params = useParams()
  console.log(params.id);
  useEffect(()=>{
      actions.getProducto(params.id)
      console.log(store.producto);
      actions.getProductosTienda(params.tienda_id);
},[]); 
  console.log(store.productosTienda);
  console.log(params.tienda_id);
  
    return (
      <>
      <div className="card" >
        <div className="card-body">
          <div><Info nombre_producto = {store.producto.nombre_producto} key={store.producto.id} url_imagen_producto={store.producto?.url_imagen_producto} descripcion_producto={store.producto.descripcion_producto} precio={store.producto.precio} id ={store.producto.id} nombre_tienda ={store.producto.nombre_tienda} isFavorito={store.producto.isFavorito}/></div>
         </div>
      </div>
      <div className="categorias-home container-fluid d-flex mb-5" style={{ overflowX: "scroll" }}>
              {store.productosTienda.map((producto) =>{
                  return (
                    <TodosProductos nombre_producto = {producto.nombre_producto} key={producto.id} id ={producto.id} url_imagen_producto={producto.url_imagen_producto} descripcion_producto={producto.descripcion_producto} nombre_tienda={producto.nombre_tienda} precio={producto.precio} tienda_id={producto.tienda_id}/>
                  )
                })}
			</div>  
      </>
    );
  };



  
// esto seria la parte de la review
//   import React, { useState } from 'react';

// const ReviewSection = () => {
//   const [reviews, setReviews] = useState([]); // Estado para almacenar las reseñas

//   const handleAddReview = (newReview) => {
//     setReviews([...reviews, newReview]); // Agregar nueva reseña al estado
//   };

//   return (
//     <div className="review-section">
//       <h2>Reseñas</h2>
//       <ReviewList reviews={reviews} />
//       <AddReviewForm onAddReview={handleAddReview} />
//     </div>
//   );
// };

// const ReviewList = ({ reviews }) => {
//   return (
//     <ul>
//       {reviews.map((review) => (
//         <li key={review.id}>
//           <p>{review.comentario}</p>
//           <p>Calificación: {review.calificacion}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// const AddReviewForm = ({ onAddReview }) => {
//   const [comentario, setComentario] = useState('');
//   const [calificacion, setCalificacion] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newReview = {
//       id: Math.random().toString(),
//       comentario,
//       calificacion,
//     };
//     onAddReview(newReview);
//     setComentario('');
//     setCalificacion(0);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Comentario:</label>
//       <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
//       <label>Calificación:</label>
//       <input type="number" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
//       <button type="submit">Enviar reseña</button>
//     </form>
//   );
// };

// export default ReviewSection;