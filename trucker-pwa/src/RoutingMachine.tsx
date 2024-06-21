// RoutingMachine.tsx

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingMachineProps {
  locations: Location[]; // Array of objects with lat and lng properties
}
interface Location {
  lat: number;
  lng: number;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const waypoints = locations.map(location => L.latLng(location.lat, location.lng));

    const startIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });

    const endIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
    });

    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      show: false,
      createMarker: function (i: number, waypoint, n: number) {
        return L.marker(waypoint.latLng, {
          icon: i === 0 ? startIcon : i === n - 1 ? endIcon : undefined,
        });
      }
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, locations]);

  return null;
};

export default RoutingMachine;
