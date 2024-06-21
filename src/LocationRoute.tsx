import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import RoutingMachine from './RoutingMachine.tsx';
import { LatLngLiteral } from 'leaflet';
import { Coords } from './GeoLocation.tsx';
import axios from 'axios';
const startLatLng: LatLngLiteral = { lng: 9.9967015, lat: 53.5447748 };

const LocationRoute: React.FC = () => {
  const [pastCoords, setPastCoordsList] = useState<Coords[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const headers = {
            "ngrok-skip-browser-warning": "hello world",
        };
        const response = await axios.get('https://82ba-84-46-88-53.ngrok-free.app/get-coords/Trucker%20PWA', {headers});
        console.log([response.data.coords[0], response.data.coords[-1]])
        setPastCoordsList([response.data.coords[0], response.data.coords[response.data.coords.length - 1]]);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
        {pastCoords?.length > 0 ? (
        <MapContainer
            center={startLatLng}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
            minZoom={3}
            maxZoom={18}
            maxBounds={[
                [-90, -180],
                [90, 180],
            ]}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RoutingMachine locations={pastCoords} />
        </MapContainer>
        ) : (
            <p>No locations available</p>
        )}
    </div>
  );
};

export default LocationRoute;
