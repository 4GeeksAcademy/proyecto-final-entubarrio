import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const MapaTienda = ({ direccion }) => {
  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["marker"], 
      });

      await loader.load();

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: direccion }, (results, status) => {
        if (status === 'OK') {
          const map = new google.maps.Map(document.getElementById("map"), {
            center: results[0].geometry.location,
            zoom: 14,
            mapId: "DEMO_MAP_ID", 
          });

          
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: results[0].geometry.location,
            title: "Tienda",
          });
        } else {
          console.error();
        }
      });
    };

    loadMap().catch(error => {
      console.error('Error loading Google Maps API: ', error);
    });
  }, [direccion]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className='pt-4'>Ubicación de la tienda</h1>
      <div id="map" style={{ height: "70vh", width: "90%" }}></div>
    </div>
  );
};

export default MapaTienda;
