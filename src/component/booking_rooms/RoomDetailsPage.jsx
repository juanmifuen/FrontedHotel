import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // 
import DatePicker from 'react-datepicker';

const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Acceder a la función navigate para navegar
  const { roomId } = useParams(); // Obtener el ID de la habitación de los parámetros de la URL
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Seguir el estado de carga
  const [error, setError] = useState(null); // Seguir cualquier error
  const [checkInDate, setCheckInDate] = useState(null); // Variable de estado para la fecha de check-in
  const [checkOutDate, setCheckOutDate] = useState(null); // Variable de estado para la fecha de check-out
  const [numAdults, setNumAdults] = useState(1); // Variable de estado para el número de adultos
  const [numChildren, setNumChildren] = useState(0); // Variable de estado para el número de niños
  const [totalPrice, setTotalPrice] = useState(0); // Variable de estado para el precio total de la reserva
  const [totalGuests, setTotalGuests] = useState(1); // Variable de estado para el número total de huéspedes
  const [showDatePicker, setShowDatePicker] = useState(false); // Variable de estado para controlar la visibilidad del selector de fechas
  const [userId, setUserId] = useState(''); // Establecer el ID del usuario
  const [showMessage, setShowMessage] = useState(false); // Variable de estado para controlar la visibilidad del mensaje
  const [confirmationCode, setConfirmationCode] = useState(''); // Variable de estado para el código de confirmación de la reserva
  const [errorMessage, setErrorMessage] = useState(''); // Variable de estado para el mensaje de error
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Establecer la carga como verdadera
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [roomId]); 


  const handleConfirmBooking = async () => {
    // Comprueba si las fechas de entrada y salida están seleccionadas
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('seleccione las fecha.');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }

    // Verificar el  numero de niños y adultos
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('ingresa un numero valido.');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }

    // Calcular el número total de días
    const oneDay = 24 * 60 * 60 * 1000; // horas * minutos * sugundos * milisegundos
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calcular el número total de huespedes
    const totalGuests = numAdults + numChildren;

    // Calcula precio total 
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {

      // Asegúra el checkInDate y checkOutDate 
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convertir fechas al formato AAAA-MM-DD, ajustándolas a las diferentes  zonas horarias
      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];


      // Registre las fechas correctas
      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      // Creamos la reserva
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };
      console.log(booking)
      console.log(checkOutDate)

      
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Establecer código de confirmación de reserva
        setShowMessage(true); 
        // Ocultar el mensaje y navegar a la página de inicio después de 5 segundos
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms'); 
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000); // Borra el mensaje de error después de 5 segundos
    }
  };

  if (isLoading) {
    return <p className='room-detail-loading'>Detalles ...</p>;
  }

  if (error) {
    return <p className='room-detail-loading'>{error}</p>;
  }

  if (!roomDetails) {
    return <p className='room-detail-loading'>Habitación no encontrada.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          Reserva realizada con éxito!, Este es su Código de confirmación: {confirmationCode}. Se le ha enviado un SMS y un correo electrónico con los detalles de su reserva.
        </p>
      )}
      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
      <h2>Detalles Habitacion</h2>
      <br />
      <img src={roomPhotoUrl} alt={roomType} className="room-details-image" />
      <div className="room-details-info">
        <h3>{roomType}</h3>
        <p>Precio: ${roomPrice} / Noche</p>
        <p>{description}</p>
      </div>
      {bookings && bookings.length > 0 && (
        <div>
          <h3>Detalles de la reserva existente</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">Reserva {index + 1} </span>
                <span className="booking-text">Fecha de entrada: {booking.checkInDate} </span>
                <span className="booking-text">Salida: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info">
        <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Reservar ahora</button>
        <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Atras</button>
        {showDatePicker && (
          <div className="date-picker-container">
            <DatePicker
              className="detail-search-field"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
              // Formato ="yyyy-MM-dd"
            />
            <DatePicker
              className="detail-search-field"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              // Formato ="yyyy-MM-dd"
              dateFormat="dd/MM/yyyy"
            />

            <div className='guest-container'>
              <div className="guest-div">
                <label>Adultos:</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="guest-div">
                <label>Niños:</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                />
              </div>
              <button className="confirm-booking" onClick={handleConfirmBooking}>Confirmar reserva</button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total Precio: ${totalPrice}</p>
            <p>Total Huespedes: {totalGuests}</p>
            <button onClick={acceptBooking} className="accept-booking">Aceptar reserva</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
