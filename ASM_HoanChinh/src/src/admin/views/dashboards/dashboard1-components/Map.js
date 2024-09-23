import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet"
import axios from "axios";

import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import'./style.css'
import { getQuanan } from "../../../../services/Quanan";
import { BASE_URL } from "../../../../config/ApiConfig";

const makerIcon = new L.Icon({
    iconUrl: require('../../../assets/images/waker.png'),
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
})

const makerIconBlue = new L.Icon({
    iconUrl: require('../../../assets/images/makerblue.png'),
    iconSize: [20, 37],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
})

const geocodeAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const location = response.data[0];
            return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        }
    } catch (error) {
        console.error("Error fetching geocode data:", error);
    }

    return null;
};

const MapComponent = () => {
    const [center, setCenter] = useState({ lat: 10.0452, lng: 105.7469 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);


    useEffect(() => {
        initData();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }      
    }, []);

    const initData = async () => {
        const res = await getQuanan();
        const quanan = res.data;

        const geocodePromises = quanan.map(async (item) => {
            const coords = await geocodeAddress(item.dia_chi);
            return { ...item, coords };
        });

        const results = await Promise.all(geocodePromises);
        setLocations(results.filter(item => item.coords));
    };

    return (
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "600px", width: "100%", border: "10px", borderRadius: "10px" }}>
            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={makerIconBlue}>
                    <Popup>
                        <b>Vị trí của bạn</b><br />
                    </Popup>
                </Marker>
            )}
            {locations.map((element, index) => (
                <Marker key={index} position={[element.coords.lat, element.coords.lng]} icon={makerIcon}>
                    <Popup>
                        <img src={`${BASE_URL}/uploads/${element.hinh_anh}`} alt="" style={{width: "100%"}}/><br/>
                        <b>{element.ten_quan_an}</b><br/>
                        {element.gio_hoat_dong} <br/>
                        {element.dia_chi}
                    </Popup>
                </Marker>
            ))}
            {/* {userLocation && destination && (
                <Routing
                    waypoints={[
                        { lat: userLocation.lat, lng: userLocation.lng },
                        { lat: destination.lat, lng: destination.lng },
                    ]}
                />
            )} */}
        </MapContainer>
    );
};

export default MapComponent;
