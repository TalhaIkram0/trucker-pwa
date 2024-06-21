import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGeolocated } from 'react-geolocated';
import LocationRoute from './LocationRoute';

export interface Coords {
  lat: number;
  lng: number;
  ts?: string;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#242424', // Dark background color
    color: '#fff', // Text color
  };
  
  const contentStyle: React.CSSProperties = {
    width: '80%',
    maxWidth: '600px',
    margin: '20px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#444', // Slightly lighter background for content
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };
  
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };
  
  const tdStyle: React.CSSProperties = {
    padding: '10px',
    borderBottom: '1px solid #666', // Darker border color
  };

const GeoLocation: React.FC = () => {
  const [coordslist, setCoordsList] = useState<Coords[]>([]);
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });

  const sendLocationData = async () => {
    try {
      await axios.post(
        'https://82ba-84-46-88-53.ngrok-free.app/post-coords',
        {
          name: 'Trucker PWA',
          coords: coordslist,
        }
      );
      console.log('Location data sent');
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      setCoordsList([
        ...coordslist,
        {
          lat: coords.latitude,
          lng: coords.longitude,
          ts: new Date().toISOString(),
          altitude: coords.altitude,
          heading: coords.heading,
          speed: coords.speed,
        },
      ]);
    }
  }, [coords]);

  useEffect(() => {
    console.log('Sending location data');
    if (coordslist.length > 0) {
      sendLocationData();
    }
  }, [coordslist]);

  return (
    <div style={containerStyle}>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords ? (
        <div style={contentStyle}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Current Location</h3>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={tdStyle}>Latitude</td>
                <td style={tdStyle}>{coords.latitude}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Longitude</td>
                <td style={tdStyle}>{coords.longitude}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Altitude</td>
                <td style={tdStyle}>{coords.altitude}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Heading</td>
                <td style={tdStyle}>{coords.heading}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Speed</td>
                <td style={tdStyle}>{coords.speed}</td>
              </tr>
            </tbody>
          </table>
          <LocationRoute />
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          Getting the location data...
        </div>
      )}
    </div>
  );
};

export default GeoLocation;
