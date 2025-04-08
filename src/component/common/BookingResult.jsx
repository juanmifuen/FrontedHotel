import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  return (
    <div className="booking-results">
      {bookingSearchResults.map((booking) => (
        <div key={booking.id} className="booking-result-item">
          <p>Habitacion ID: {booking.roomId}</p>
          <p>Usuario ID: {booking.userId}</p>
          <p>Fecha de inicio: {booking.startDate}</p>
          <p>Fecha de finalización: {booking.endDate}</p>
          <p>Estado: {booking.status}</p>
          <Link to={`/admin/edit-booking/${booking.id}`} className="edit-link">Editar</Link>
        </div>
      ))}
    </div>
  );
};

export default BookingResult;
