import React, { useEffect } from 'react';

const MapaTienda = ({ direccion }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsIBNwbUhbP1o2qdj_mbCBWWkoA2zJ1d4&callback=initMap&libraries=maps,marker&v=beta`;
        script.async = true;
        document.body.appendChild(script);

        const initMap = () => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: direccion }, (results, status) => {
                if (status === 'OK') {
                    const map = new window.google.maps.Map(document.getElementById("map"), {
                        center: results[0].geometry.location,
                        zoom: 14,
                    });

                    new window.google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: "Tienda"
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        };

        window.initMap = initMap;

        return () => {
            window.initMap = null;
        };
    }, [direccion]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>Ubicación de la tienda</h3>
            <div id="map" style={{ height: "70vh", width: "90%" }}></div>
        </div>
    );
};

export default MapaTienda;
