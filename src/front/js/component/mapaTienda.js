import React, { useEffect } from 'react';

const MapaTienda = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap&v=weekly`;
        script.defer = true;
        script.async = true;

        script.onload = () => {
            // Una vez que el script se carga correctamente, se llama a la función initMap
            initMap();
        };

        script.onerror = () => {
            // Manejo de errores si el script no se carga correctamente
            console.error('Error al cargar el script de la API de Google Maps.');
        };

        document.body.appendChild(script);

        // Función para inicializar el mapa
        function initMap() {
            let map, infoWindow;

            map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 6,
            });
            infoWindow = new window.google.maps.InfoWindow();

            const locationButton = document.createElement("button");

            locationButton.textContent = "Pan to Current Location";
            locationButton.classList.add("custom-map-control-button");
            map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
            locationButton.addEventListener("click", () => {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                        },
                        () => {
                            handleLocationError(true, infoWindow, map.getCenter());
                        }
                    );
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
    );
};

export default MapaTienda;
