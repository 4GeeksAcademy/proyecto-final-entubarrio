import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Info from "../component/info";
// import CardTienda from "../component/cardTienda";
import CardProductos from "../component/cardProductos";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";



export const Infoproducto = () => {

  const { store, actions } = useContext(Context);

  const params = useParams()
  console.log(params.id);
  useEffect(()=>{
      actions.getProducto(params.id)
      actions.getProductosTienda(store.producto.tienda_id)
      actions.seleccionCategoriaProductosTienda()
},[]); 
  
    return (
      <>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-text">holeeeeee</h5>
          <div><Info nombre_producto = {store.producto.nombre_producto} key={store.producto.id} url_imagen_producto={store.producto.url_imagen_producto} descripcion_producto={store.producto.descripcion_producto} precio={store.producto.precio} id ={store.producto.id}/></div>
          <div>
            {/* <div><CardTienda /></div> */}
            <div><CardProductos/></div>
            <div><h2>las reviews van es esta linea</h2> </div>

           
          
  
          </div>
          
         
          
        
         </div>
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