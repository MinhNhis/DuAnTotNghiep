import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

const makerIcon = new L.Icon({
    iconUrl: require('../../../admin/assets/images/waker.png'),
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
});

const Routing = ({ waypoints }) => {
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
