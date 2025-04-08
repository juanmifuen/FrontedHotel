import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";




const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Función para manejar los resultados de la búsqueda
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* ENCABEZADO / SECCIÓNESDEl BANNER */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/image.webp" alt=" Hotel" className="header-image" /> {/*  /  imagen de fondo */}
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                        Bienvenido a<span className="JACMPG-color">  JACHAB</span>
                        </h1><br />
                        <h3>Entra al paraíso de la comodidad y cuidado.</h3>
                        <h3>"hotels y resorts".</h3> 
                    </div>
                </header>
            </section>

            {/* BUSCAR O ENCONTRAR SECCIÓN DE HABITACIONES DISPONIBLES */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <h4><a className="view-rooms-home" href="/rooms">Todas las habitaciones</a></h4>

            <h2 className="home-services">Servicios Del<span className="JACMPG-color"> Hotel</span></h2>

            {/* SERVICIOS */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/Splitmini.png" alt="Aire acondicionado" />
                <div className="service-details">
                    <h3 className="service-title">Aire acondicionado</h3>
                    <p className="service-description">Manténgase fresco y cómodo durante su estadía con nuestro aire acondicionado en la habitación con control individual a su gusto..</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/bebidas.png" alt="Mini Bar" />
                    <div className="service-details">
                        <h3 className="service-title">Mini Bar</h3>
                        <p className="service-description">Disfrute de una conveniente selección de bebidas y refrigerios almacenados en el minibar de su habitación sin costo adicional.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/parking.png" alt="Parking" />
                    <div className="service-details">
                        <h3 className="service-title">Parqueadero</h3>
                        <p className="service-description">Ofrecemos estacionamiento en el lugar para su comodidad. Pregunte por las opciones de servicio de valet disponibles.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="WiFi" />
                    <div className="service-details">
                        <h3 className="service-title">WiFi</h3>
                        <p className="service-description">Manténgase conectado durante su estadía con acceso Wi-Fi de alta velocidad, gratuito  en todas las habitaciones y áreas .</p>
                    </div>
                </div>


                <div className="service-card">
                    <img src="./assets/images/playa.png" alt="playa" />
                    <div className="service-details">
                        <h3 className="service-title">playa</h3>
                        <p className="service-description">Descubre un oasis de exclusividad en nuestra playa privada,
                             . Arena blanca, aguas cristalinas 
                            y servicio personalizado crean un ambiente perfecto para relajarse. .</p>
                    </div>
                </div>

                <div className="service-card">
                    <img src="./assets/images/restaurante.png" alt="restaurante" />
                    <div className="service-details">
                        <h3 className="service-title">restaurante</h3>
                        <p className="service-description">Un equipo de chefs expertos crea experiencias
                             gastronómicas inspiradas en sabores locales e internacionales,
                             transformando cada comida en una celebración de elegancia y sabor. .</p>
                    </div>
                </div>

            </section>
            
            <section>

            </section>
        </div>
    );
}

export default HomePage;
