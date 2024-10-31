import { useEffect, useState, useRef } from "react";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import './style.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import "leaflet-routing-machine";
import useLocalStorage from "./useLocalStorage";
import useGeolocation from "./useGeolocation";
import { getQuanan } from "../../../services/Quanan";
import { BASE_URL } from "../../../config/ApiConfig";

const Map = ({ quanan, sizeData }) => {
    const mapRef = useRef();
    const userMarkerRef = useRef();
    const locationRef = useRef();
    const [speed, setSpeed] = useState(50);
    const [color, setColor] = useState(0);
    const speedRef = useRef(speed);
    const [nearbyMarkers, setNearbyMarkers] = useLocalStorage("NEARBY_MARKERS", []);
    const [routesInfo, setRoutesInfo] = useState([]);
    const [routingControl, setRoutingControl] = useState(null);
    const location = useGeolocation();
    locationRef.current = location;
    const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
        latitude: 0,
        longitude: 0,
    });
    const userLocationIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 40],
        iconAnchor: [17, 45],
        popupAnchor: [0, -45]
    });

    const makerIconOff = new L.Icon({
        iconUrl: require('../../../admin/assets/images/marker.png'),
        iconSize: [23, 37],
        iconAnchor: [17, 45],
        popupAnchor: [0, -45]
    })

    const makerIconOn = new L.Icon({
        iconUrl: require('../../../admin/assets/images/marker-blue.png'),
        iconSize: [40, 45],
        iconAnchor: [17, 45],
        popupAnchor: [0, -45]
    })
    const routeColors = ["blue", "red", "green", "purple", "orange", "yellow"];

    useEffect(() => {
        
        loadMap()
    }, [quanan, sizeData]);

    useEffect(() => {
        speedRef.current = speed;
        updatePopups();
    }, [speed]);

    useEffect(() => {
        setTimeout(() => {
            userLocation();
        }, 2000)
    }, [location]);

    // useEffect(() => {
    //     if (!mapRef.current) {
    //         mapRef.current = L.map("map").setView([userPosition.latitude, userPosition.longitude], 13);

    //         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //             maxZoom: 19,
    //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //         }).addTo(mapRef.current);

    //         nearbyMarkers.forEach(({ latitude, longitude }) => {
    //             L.marker([latitude, longitude], { icon: userLocationIcon })
    //                 .addTo(mapRef.current)
    //                 .bindPopup(`lat: ${latitude}, long: ${longitude}`);
    //         });

    //         mapRef.current.addEventListener("click", (e) => {
    //             const { lat: latitude, lng: longitude } = e.latlng;
    //             const currentLocation = locationRef.current;

    //             if (!currentLocation.latitude || !currentLocation.longitude || !latitude || !longitude) {
    //                 console.error("Vị trí không hợp lệ hoặc chưa được khởi tạo.");
    //                 return;
    //             }

    //             // Tạo marker mới cho vị trí được click
    //             L.marker([latitude, longitude], { icon: userLocationIcon })
    //                 .addTo(mapRef.current)
    //                 .bindPopup(`lat: ${latitude.toFixed(2)}, long: ${longitude.toFixed(2)}`);

    //             setNearbyMarkers((prevMarkers) => [...prevMarkers, { latitude, longitude }]);

    //             const color = routeColors[nearbyMarkers.length % routeColors.length];

    //             // Tạo tuyến đường với màu sắc khác nhau
    //             L.Routing.control({
    //                 waypoints: [
    //                     L.latLng(currentLocation.latitude, currentLocation.longitude),
    //                     L.latLng(latitude, longitude)
    //                 ],
    //                 createMarker: (i, n) => {
    //                     if (i === n - 1) {
    //                         return L.marker([latitude, longitude], { icon: userLocationIcon }).addTo(mapRef.current);
    //                     }
    //                 },
    //                 lineOptions: {
    //                     styles: [{ color, weight: 4 }]
    //                 },
    //                 addWaypoints: true, 
    //                 routeWhileDragging: false,
    //             }).addTo(mapRef.current);

    //             // Điều chỉnh zoom sau khi thêm điểm mới
    //             const bounds = L.latLngBounds([currentLocation.latitude, currentLocation.longitude], [latitude, longitude]);
    //             mapRef.current.fitBounds(bounds, { padding: [50, 50] });

    //             // Tính khoảng cách từ vị trí hiện tại đến điểm đã click
    //             const userLatLng = L.latLng(currentLocation.latitude, currentLocation.longitude);
    //             const clickedLatLng = L.latLng(latitude, longitude);
    //             const distance = userLatLng.distanceTo(clickedLatLng); // Khoảng cách tính bằng mét

    //             // Hiển thị thông tin khoảng cách
    //             alert(`Khoảng cách đến điểm được click là ${distance.toFixed(2)} mét.`);
    //         });
    //     }
    // }, [userPosition, nearbyMarkers, setNearbyMarkers]);
    const userLocation = () => {
        setUserPosition({ ...userPosition });

        if (userMarkerRef.current) {
            mapRef.current.removeLayer(userMarkerRef.current);
        }

        if (location.latitude && location.longitude) {
            userMarkerRef.current = L.marker([location.latitude, location.longitude], { icon: userLocationIcon })
                .addTo(mapRef.current)
                .bindPopup("Vị trí của bạn");

            const el = userMarkerRef.current.getElement();
            if (el) {
                el.style.filter = "hue-rotate(120deg)";
            }

            mapRef.current.setView([location.latitude, location.longitude], 16);
        }
    };
    const khoangCach = async (lat1, lon1, lat2, lon2, retries = 3) => {
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&alternatives=true&steps=true`;

        try {
            const response = await fetch(url, { timeout: 1000 });
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const distance = route.distance / 1000;
                return distance;
            } else {
                return null;
            }
        } catch (error) {
            if (retries > 0) {
                console.warn("Lỗi khi gọi OSRM API, thử lại...", retries);
                return await khoangCach(lat1, lon1, lat2, lon2, retries - 1);
            } else {
                console.error("Lỗi khi gọi OSRM API sau nhiều lần thử:", error);
                return null;
            }
        }
    };


    const isOpen = (openTime, closeTime) => {
        const now = new Date();
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = closeTime.split(':').map(Number);

        const openingTime = new Date(now);
        const closingTime = new Date(now);

        openingTime.setHours(openHour, openMinute, 0);
        closingTime.setHours(closeHour, closeMinute, 0);

        return now >= openingTime && now <= closingTime;
    };

    const loadMap = async () => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([userPosition.latitude, userPosition.longitude], 16);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(mapRef.current);
        }

        for (const quan of quanan) {
            if (quan.lat && quan.lng) {
                const popupContent = `
                    <a href="/chi-tiet/${quan.id_quanan}" style="color: black; text-decoration: none;">
                        <div style="width: 200px; text-align: center;">
                            <img src="${BASE_URL}/uploads/${quan.hinh_anh}" alt="${quan.ten_quan_an}" loading="lazy" style="width: 100%; height: 100px; border-radius: 10px; object-fit: cover;" />
                            <h6 style="margin: 5px 0;">${quan.ten_quan_an}</h6>
                            <div className='mb-1' style="color: ${isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? 'green' : 'red'}; margin: 3px 0;">
                                ${isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? `<p style="font-size: 12px; margin: 0;">${quan.gio_mo_cua} - ${quan.gio_dong_cua} Đang mở cửa</p>` : `<p style="font-size: 12px; margin: 0;">Đã đóng cửa</p>`}
                            </div>
                            <p style="font-size: 12px; margin: 3px 0;">${quan.dia_chi}</p>
                        </div>
                    </a>
                `;

                const marker = L.marker([quan.lat, quan.lng], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff })
                    .addTo(mapRef.current)
                    .bindPopup(popupContent)
                    .on('click', () => calculateRoute(quan.lat, quan.lng, quan));
                if (location.latitude && location.longitude) {
                    const distance = await khoangCach(location.latitude, location.longitude, quan.lat, quan.lng);
                    if (sizeData === 1) {
                        calculateRoute(quan.lat, quan.lng, quan)
                    } else {
                        if (distance && distance <= 10) {
                            calculateRoute(quan.lat, quan.lng, quan);
                        }
                    }
                } else {
                    calculateRoute(quan.lat, quan.lng, quan);
                }


            } else {
                console.error(`Quán ăn ${quan.ten_quan_an} không có vị trí hợp lệ.`);
            }
        }
    };

    const calculateRoute = (latitude, longitude, quan) => {
        const currentLocation = locationRef.current;

        if (!currentLocation.latitude || !currentLocation.longitude) {
            console.error("Vị trí người dùng không hợp lệ.");
            return;
        }

        const color = routeColors[nearbyMarkers.length % routeColors.length];

        if (routingControl) {
            mapRef.current.removeControl(routingControl);
        }

        const routingContainer = document.querySelector('.leaflet-routing-container');

        const newRoutingControl = L.Routing.control({
            waypoints: [
                L.latLng(currentLocation.latitude, currentLocation.longitude),
                L.latLng(latitude, longitude)
            ],
            router: L.Routing.osrmv1({
                language: 'vi',
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            }),
            createMarker: (i, n) => {
                if (i === n - 1) {
                    return L.marker([latitude, longitude], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff }).addTo(mapRef.current);
                }
            },
            lineOptions: {
                styles: [{ color, weight: 4 }]
            },
            showAlternatives: false,
            routeWhileDragging: false,
        }).addTo(mapRef.current);

        setRoutingControl(newRoutingControl);
        newRoutingControl.on('routesfound', (e) => {
            const routes = e.routes;
            const summary = routes[0].summary;
            const distance = summary.totalDistance;

            const distanceKm = distance / 1000;
            const currentSpeed = speedRef.current;
            const timeHours = distanceKm / currentSpeed;
            const timeMinutes = timeHours * 60;
            const hours = Math.floor(timeMinutes / 60);
            const minutes = Math.round(timeMinutes % 60);

            const popupContent = `
                <a href="/chi-tiet/${quan.id_quanan}" style="color: black; text-decoration: none;">
                    <div style="width: 200px; text-align: center;">
                        <img src="${BASE_URL}/uploads/${quan.hinh_anh}" alt="${quan.ten_quan_an}" loading="lazy" style="width: 100%; height: 100px; border-radius: 10px; object-fit: cover;" />
                        <h6 style="margin: 5px 0;">${quan.ten_quan_an}</h6>
                        <div className='mb-1' style="color: ${isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? 'green' : 'red'}; margin: 3px 0;">
                            ${isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? `<p style="font-size: 12px; margin: 0;">${quan.gio_mo_cua}- ${quan.gio_dong_cua} Đang mở cửa</p>` : `<p style="font-size: 12px; margin: 0;">Đã đóng cửa</p>`}
                        </div>
                        <p style="font-size: 12px;; margin: 0;">${quan.dia_chi}</p>
                        <p> ${distanceKm.toFixed(2)} Km, Thời gian: ${hours} giờ ${minutes} phút</p>
                    </div>
                </a>
            `;

            const marker = L.marker([latitude, longitude], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff })
                .addTo(mapRef.current)
            marker.bindPopup(popupContent)
            marker.openPopup();

            setNearbyMarkers((prevMarkers) => [...prevMarkers, { latitude, longitude }]);
            setRoutesInfo((prevRoutes) => [
                ...prevRoutes,
                { latitude, longitude, distanceKm, marker, hinh_anh: quan.hinh_anh, ten_quan_an: quan.ten_quan_an, dia_chi: quan.dia_chi, gio_mo_cua: quan.gio_mo_cua, gio_dong_cua: quan.gio_dong_cua, id_quanan: quan.id_quanan },
            ]);
        });

        if (sizeData === 1) {
            if (routingContainer) {
                routingContainer.style.display = (sizeData === 1) ? 'block' : 'none';
            }
        } else return
    };

    const updatePopups = () => {
        routesInfo.forEach((route) => {
            const { distanceKm, marker, hinh_anh, ten_quan_an, dia_chi, gio_mo_cua, gio_dong_cua, id_quanan } = route;

            const currentSpeed = speedRef.current;
            const timeHours = distanceKm / currentSpeed;
            const timeMinutes = timeHours * 60;
            const hours = Math.floor(timeMinutes / 60);
            const minutes = Math.round(timeMinutes % 60);

            const newPopupContent = `
                <a href="/chi-tiet/${id_quanan}" style="color: black; text-decoration: none;">
                    <div style="width: 200px; text-align: center;">
                        <img src="${BASE_URL}/uploads/${hinh_anh}" alt="${ten_quan_an}" loading="lazy" style="width: 100%; height: 100px; border-radius: 10px; object-fit: cover;" />
                        <h6 style="margin: 5px 0;">${ten_quan_an}</h6>
                        <div className='mb-1' style=" color: ${isOpen(gio_mo_cua, gio_dong_cua) ? 'green' : 'red'}; margin: 3px 0;">
                            ${isOpen(gio_mo_cua, gio_dong_cua) ? `<p style="font-size: 12px; margin: 0;">${gio_mo_cua}- ${gio_dong_cua} Đang mở cửa</p>` : `<p style="font-size: 12px; margin: 0;">Đã đóng cửa</p>`}
                        </div>
                        <p style="font-size: 12px; margin: 0;">${dia_chi}</p>
                        <p>${distanceKm.toFixed(2)} Km, Thời gian: ${hours} giờ ${minutes} phút</p>
                    </div>
                </a>
            `;

            marker.setPopupContent(newPopupContent);
            if (marker.isPopupOpen()) {
                marker.openPopup();
            }
        });
    };

    return (
        <div className="container-fluid">
            <DriveEtaIcon onClick={() => setSpeed(80)} style={{ cursor: 'pointer', marginRight: '30px' }} title="Ô tô (80 km/h)" />
            <TwoWheelerIcon onClick={() => setSpeed(50)} style={{ cursor: 'pointer', marginRight: '30px' }} title="Xe máy (50 km/h)" />
            <PedalBikeIcon onClick={() => setSpeed(20)} style={{ cursor: 'pointer' }} title="Xe đạp (20 km/h)" />
            <div id="map" style={{ height: "100vh", width: "100%" }}></div>
        </div>
    );
}

export default Map