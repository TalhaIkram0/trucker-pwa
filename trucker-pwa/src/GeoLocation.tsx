import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGeolocated } from "react-geolocated";
import LocationMap from './LocationMap.tsx';

export interface Coords {
    lat: number;
    lng: number;
    ts?: string;
    altitude?: number | null;
    heading?: number | null;
    speed?: number | null;
}

const GeoLocation = () => {
    const [coordslist, setCoordsList] = useState<Coords[]>([]);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            watchPosition: true,
            userDecisionTimeout: 5000,
        });

    const sendLocationData = async () => {
        try {
            await axios.post(
                'https://ad6d-84-46-88-53.ngrok-free.app/post-coords',
                {
                    name: 'Trucker PWA',
                    coords: coordslist
                }
            );
        } catch (error) {
            console.error('Error sending location data:', error);
        }
    };
    useEffect(() =>     {
        if (coords?.latitude && coords?.longitude) {
            setCoordsList(
                [...coordslist,
                    {
                        lat: coords?.latitude,
                        lng: coords?.longitude,
                        ts: new Date().toISOString(),
                        altitude: coords?.altitude,
                        heading: coords?.heading,
                        speed: coords?.speed
                    }
                ]
            );
        }
    }, [coords]);

    useEffect(() => {
        console.log('Sending location data');
        if (coordslist.length > 0) {
            sendLocationData();
            console.log('Location data sent');
        }    
    }, [coordslist]);

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <div>
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{coords.speed}</td>
                </tr>
                
            </tbody>
        </table>
        <LocationMap lat={coords.latitude} lng={coords.longitude} />
        </div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default GeoLocation;