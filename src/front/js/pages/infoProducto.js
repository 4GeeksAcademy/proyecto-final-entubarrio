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