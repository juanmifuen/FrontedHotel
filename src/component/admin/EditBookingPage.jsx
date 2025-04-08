import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; 

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null); // Variable de estado para detalles de la reserva
    const [error, setError] = useState(null); //Realizar un seguimiento de cualquier error
    const [success, setSuccessMessage] = useState(null); 



    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);


    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
            return; 
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("La reserva se realizó con éxito")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Detalles de las Reservas</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Detalles de la reserva</h3>
                    <p>Código de confirmación: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Numero de Adultos: {bookingDetails.numOfAdults}</p>
                    <p>Numero de niños: {bookingDetails.numOfChildren}</p>
                    <p>Correo electrónico del Huesped: {bookingDetails.guestEmail}</p>

                    <br />
                    <hr />
                    <br />
                    <h3> Detalles de la Reserva</h3>
                    <div>
                        <p> Nombre: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Detalles Habitacion</h3>
                    <div>
                        <p> Tipo Habitacion : {bookingDetails.room.roomType}</p>
                        <p> Precio Habitacion: ${bookingDetails.room.roomPrice}</p>
                        <p> Descripcion de la Habitacion: {bookingDetails.room.roomDescription}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                    <button
                        className="acheive-booking"
                        onClick={() => acheiveBooking(bookingDetails.id)}>Eliminar Reserva
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;
