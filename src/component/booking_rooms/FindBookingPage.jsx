import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; 

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null); 

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Por favor, introduzca un código de confirmación de reserva");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Llamar a la API para obtener detalles de la reserva
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); 
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Encuentra reservas</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Introduzca su código de confirmación de reserva"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Encontrar</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Detalles de la reserva</h3>
                    <p> Codigo: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Numero de Adultos: {bookingDetails.numOfAdults}</p>
                    <p>Numero de niños: {bookingDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>reserva detalles</h3>
                    <div>
                        <p> Nombre: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3> Detalles Habitacion</h3>
                    <div>
                        <p> Tipo Habitacion: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;
