import React, { useEffect, useRef } from "react";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import './style.css';

import { makerIcon } from "../Map";
import { BASE_URL } from "../../../config/ApiConfig";

const Routing = ({ waypoints, obj, boolend }) => {
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            // Handle location found if needed
        },
    });
    const routingControlRef = useRef(null);

    useEffect(() => {
        // Bảo đảm map đã được mount trước khi thực hiện bất kỳ hành động nào
        if (!map) {
            return;
        }

        // Loại bỏ control hiện tại nếu đã tồn tại
        if (routingControlRef.current) {
            try {
                routingControlRef.current.getPlan().setWaypoints([]); // Xóa các waypoint trước khi remove
                map.removeControl(routingControlRef.current); // Remove control
            } catch (error) {
                console.error("Error removing control:", error);
            }
        }

        // Chỉ thêm routing control nếu có nhiều hơn một waypoint
        if (waypoints.length > 1) {
            const routingControl = L.Routing.control({
                waypoints: waypoints.map(wp => L.latLng(wp.lat, wp.lng)),
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 5 }]
                },
                createMarker: (i, waypoint, n) => {
                    if (i === n - 1) {
                        const marker = L.marker(waypoint.latLng, {
                            icon: makerIcon
                        });
                        const popup = `
                            <div>
                                <img src="${BASE_URL}/uploads/${obj.hinh_anh}" alt="" style="width: 100%;" />
                                <b>${obj.ten_quan_an}</b> </br>
                                <span>${obj.gio_hoat_dong}</span></br>
                                <span>${(obj.distanceInKm)} Km </span></br>
                                <span>${obj.dia_chi}</span>
                            </div>
                        `;

                        marker.bindPopup(popup);
                        if (boolend) {
                            setTimeout(() => {
                                marker.openPopup();
                            }, 3000);
                        }

                        return marker;
                    }
                }
            }).addTo(map);

            routingControlRef.current = routingControl;
        }

        return () => {
            if (routingControlRef.current && map) {
                try {
                    routingControlRef.current.getPlan().setWaypoints([]);
                    map.removeControl(routingControlRef.current);
                    routingControlRef.current = null;
                } catch (error) {
                    console.error("Error during cleanup:", error);
                }
            }
        };
    }, [waypoints, map, boolend]);

    return null;
};


export default Routing;
