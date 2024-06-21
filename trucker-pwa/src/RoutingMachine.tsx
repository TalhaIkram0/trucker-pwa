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
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: i === 0 ? startIcon : i === n - 1 ? endIcon : null,
        });
      }
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, locations]);

  // Example marker icons
  const startIcon = L.icon({
    iconUrl: 'path_to_start_icon.png', // Replace with your start icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: 'path_to_shadow.png', // Replace with your shadow icon URL
    shadowSize: [41, 41],
  });

  const endIcon = L.icon({
    iconUrl: 'path_to_end_icon.png', // Replace with your end icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: 'path_to_shadow.png', // Replace with your shadow icon URL
    shadowSize: [41, 41],
  });

  const defaultIcon = L.icon({
    iconUrl: 'path_to_default_icon.png', // Replace with your default icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: 'path_to_shadow.png', // Replace with your shadow icon URL
    shadowSize: [41, 41],
  });

  return null;
};

export default RoutingMachine;
