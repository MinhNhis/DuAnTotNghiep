import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import './style.css'

import { makerIcon } from "../Map";

const Routing = ({ waypoints }, open) => {
    const map = useMap();

    useEffect(() => {
        if (waypoints.length > 1) {
            L.Routing.control({
                waypoints: waypoints.map(wp => L.latLng(wp.lat, wp.lng)),
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 5 }]
                },
                createMarker: (i, waypoint, n) => {
                    if (i === n - 1) {
                        return L.marker(waypoint.latLng, {
                            icon: makerIcon
                        });
                    }
                }
            }).addTo(map);

        }
    }, [waypoints, map]);

    return null;
};

export default Routing;
