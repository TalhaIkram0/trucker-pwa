import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { LatLngLiteral } from 'leaflet';


const LocationMap: React.FC<LatLngLiteral> = ({ lat, lng }) => {
  const position: LatLngLiteral = {lat: lat, lng: lng};

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}  style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
