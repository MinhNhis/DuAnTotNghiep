import React, { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Dialog, DialogContent, DialogActions } from '@mui/material';

import geocodeAddress from "../GeoLocation";
import osm from "./osm-providers";
import Routing from "../RoutingMap";
import { BASE_URL } from "../../../config/ApiConfig";
import "leaflet/dist/leaflet.css";
import './style.css'
import { getQuanan } from "../../../services/Quanan";
import { useParams } from "react-router-dom";

export const makerIcon = new L.Icon({
    iconUrl: require('../../../admin/assets/images/waker.png'),
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
});

export const makerIconBlue = new L.Icon({
    iconUrl: require('../../../admin/assets/images/makerblue.png'),
    iconSize: [20, 37],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45]
});

const UpdateCenter = ({ center }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
};

const MapComponent = () => {
    const [center, setCenter] = useState({ lat: 10.0452, lng: 105.7469 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef(null);
    const dialogMapRef = useRef(null);
    const [quan, setQuan] = useState([]);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(null);
    const params = useParams();
    const id = params.id;

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

    }, [id]);

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

    useEffect(() => {
        const locationQuan = locations.filter((e) => e.id_quanan === Number(id));
        locationQuan.forEach((e) => {
            if (e && e.coords) {
                setCenter({ lat: e.coords.lat, lng: e.coords.lng });
                setQuan(e)
            }
        });
    }, [locations, id]);

    const handleClickOpen = (latlng) => {
        setPosition(latlng);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const MapClick = () => {
        useMapEvents({
            click(e) {
                handleClickOpen(e.latlng);
            }
        });
        return null;
    };

    return (
        <>
            <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                style={{ height: "200px", width: "100%", border: "10px", borderRadius: "10px" }}
            >
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                <UpdateCenter center={center} />
                <MapClick />
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
                            <b>{element.ten_quan_an}</b><br />{element.dia_chi}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
                <DialogActions>
                    <CloseIcon onClick={handleClose} />
                </DialogActions>
                <DialogContent style={{ display: open ? 'block' : 'none' , width: "100%"}}>
                    <MapContainer
                        center={center}
                        zoom={ZOOM_LEVEL}
                        ref={dialogMapRef}
                        style={{ height: "600px", width: "100%", border: "10px", borderRadius: "10px" }}
                    >
                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                        <UpdateCenter center={center} />
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
                                    <img src={`${BASE_URL}/uploads/${element.hinh_anh}`} alt="" style={{ width: "100%" }} /><br />
                                    <b>{element.ten_quan_an}</b><br />
                                    {element.gio_hoat_dong} <br />
                                    {element.dia_chi}
                                </Popup>
                            </Marker>
                        ))}
                        {userLocation && center && (
                            <Routing
                                waypoints={[
                                    { lat: userLocation.lat, lng: userLocation.lng },
                                    { lat: center.lat, lng: center.lng },
                                ]}
                                obj={quan}
                            />
                        )}
                    </MapContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MapComponent;
