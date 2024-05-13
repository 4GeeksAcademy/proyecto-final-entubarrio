import React, { useEffect } from 'react';

const MapaTienda = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap&libraries=maps,marker&v=beta`;
        script.async = true;
        document.body.appendChild(script);

        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 40.378013610839844, lng: -3.7512316703796387 },
                zoom: 14,
            });

            new window.google.maps.Marker({
                position: { lat: 40.378013610839844, lng: -3.7512316703796387 },
                map: map,
                title: "My location"
            });
        };

        window.initMap = initMap;

        return () => {
            window.initMap = null;
        };
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Nos puedes encontrar aquí</h1>
            <div id="map" style={{ height: "70vh", width: "90%" }}></div>
        </div>
    );
};

export default MapaTienda;
