// src/leaflet-routing-machine.d.ts

import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface RoutingControlOptions {
      waypoints: L.LatLng[];
      lineOptions?: L.PolylineOptions;
      routeWhileDragging?: boolean;
      show?: boolean;
    }

    class Control extends L.Control {
      constructor(options?: RoutingControlOptions);
    }

    function control(options: RoutingControlOptions): Control;
  }
}
