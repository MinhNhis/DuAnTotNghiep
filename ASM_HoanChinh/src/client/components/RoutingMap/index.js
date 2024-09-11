import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet"
import 'leaflet-routing-machine';
import "leaflet/dist/leaflet.css";



const Routing = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        if (waypoints.length > 1) {
            L.Routing.control({
                waypoints: waypoints.map(wp => L.latLng(wp.lat, wp.lng)),
                routeWhileDragging: true
            }).addTo(map);
        }
    }, [waypoints, map]);
};

export default Routing