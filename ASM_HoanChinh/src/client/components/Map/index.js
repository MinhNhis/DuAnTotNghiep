import { useEffect, useState, useRef } from "react";
import ORS from 'openrouteservice-js';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import './style.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import "leaflet-routing-machine";
import useLocalStorage from "./useLocalStorage";
import useGeolocation from "./useGeolocation";
import { BASE_URL } from "../../../config/ApiConfig";

const client = new ORS.Directions({
    api_key: "5b3ce3597851110001cf62481bfe3c5668ca4f02a5a4d522952268ab",
});

const Map = ({ quanan, sizeData }) => {
    const mapRef = useRef();
    const userMarkerRef = useRef();
    const locationRef = useRef();
    const [speed, setSpeed] = useState(50);
    const speedRef = useRef(speed);
    const [quanan5kmlocal, setQuanan5Km] = useLocalStorage("QUAN_AN5KM", []);
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
        iconUrl: require('../../../admin/assets/images/marker-green.png'),
        iconSize: [45, 50],
        iconAnchor: [17, 45],
        popupAnchor: [0, -45]
    })
    useEffect(() => {
        setTimeout(() => {
            if (location.latitude && location.longitude) {
                userLocation();
            }
        }, 2000)

    }, [location.latitude, location.longitude]);
    useEffect(() => {
        loadMap()
    }, [sizeData]);

    useEffect(() => {
        speedRef.current = speed;
        updatePopups();
    }, [speed]);

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
            mapRef.current.setView([location.latitude, location.longitude], 13);
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
            mapRef.current = L.map("map").setView([userPosition.latitude, userPosition.longitude], 13);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '© OpenStreetMap',
            }).addTo(mapRef.current);
        }

        for (const quan of quanan) {
            if (quan.lat && quan.lng) {
                try {
                    setTimeout(() => {
                        if (sizeData > 1) {
                            calculateRoute(quan.lat, quan.lng, quan);
                        } else {
                            calculateRouteChiTiet(quan.lat, quan.lng, quan)
                        }
                    }, 1000)

                    const marker = L.marker([quan.lat, quan.lng], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff })
                        .addTo(mapRef.current)
                        .on('click', () => calculateRouteClick(quan.lat, quan.lng, quan));

                } catch (error) {
                    console.error(`Không thể load quán ${quan.ten_quan_an}:`, error);
                }
            } else {
                console.error(`Quán ăn ${quan.ten_quan_an} không có vị trí hợp lệ.`);
            }
        }
    };

    const calculateRoute = async (latitude, longitude, quan) => {
        const currentLocation = locationRef.current;
        if (!currentLocation.latitude || !currentLocation.longitude) {
            console.error("Vị trí người dùng không hợp lệ.");
            return;
        }

        try {
            const apiKey = client.defaultArgs.api_key;
            const openRouteServiceUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation.longitude},${currentLocation.latitude}&end=${longitude},${latitude}`;
            const response = await fetch(openRouteServiceUrl);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (!data.features || data.features.length === 0) {
                console.error("Không tìm thấy tuyến đường.");
                return;
            }

            const routePoints = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
            const distanceKm = (data.features[0].properties.segments[0].distance / 1000).toFixed(1);
            const timeMinutes = data.features[0].properties.segments[0].duration / 60;
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
                            <p> ${distanceKm} Km, Thời gian: ${hours ? ' giờ' : ''} ${minutes} phút</p>
                        </div>
                    </a>
                `;
            if (distanceKm <= 10) {
                const marker = L.marker([latitude, longitude], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff })
                    .addTo(mapRef.current)
                marker.bindPopup(popupContent)
                marker.openPopup();
                const routeLine = L.polyline(routePoints, { color: 'blue', weight: 4 }).addTo(mapRef.current);
                mapRef.current.fitBounds(routeLine.getBounds());
                setQuanan5Km((prevQuan) => [
                    ...prevQuan,
                    { ...quan, distanceKm }
                ]);
            }

        } catch (error) {
            console.error("Lỗi khi tính toán tuyến đường:", error.message);
        }
    };
    const calculateRouteClick = async (latitude, longitude, quan) => {
        const currentLocation = locationRef.current;
        if (!currentLocation.latitude || !currentLocation.longitude) {
            console.error("Vị trí người dùng không hợp lệ.");
            return;
        }

        try {
            const apiKey = client.defaultArgs.api_key;
            const openRouteServiceUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation.longitude},${currentLocation.latitude}&end=${longitude},${latitude}`;
            const response = await fetch(openRouteServiceUrl);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (!data.features || data.features.length === 0) {
                console.error("Không tìm thấy tuyến đường.");
                return;
            }

            const routePoints = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
            const distanceKm = (data.features[0].properties.segments[0].distance / 1000).toFixed(1);
            const timeMinutes = data.features[0].properties.segments[0].duration / 60;
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
                            <p> ${distanceKm} Km, Thời gian: ${hours ? hours + ' giờ' : ''} ${minutes} phút</p>
                        </div>
                    </a>
                `;
            const marker = L.marker([latitude, longitude], { icon: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? makerIconOn : makerIconOff })
                .addTo(mapRef.current)
            marker.bindPopup(popupContent)
            marker.openPopup();
            const routeLine = L.polyline(routePoints, { color: 'blue', weight: 4 }).addTo(mapRef.current);
            mapRef.current.fitBounds(routeLine.getBounds());

        } catch (error) {
            console.error("Lỗi khi tính toán tuyến đường:", error.message);
        }
    };

    const calculateRouteChiTiet = (latitude, longitude, quan) => {
        const currentLocation = locationRef.current;
        if (!currentLocation.latitude || !currentLocation.longitude) {
            console.error("Vị trí người dùng không hợp lệ.");
            return;
        }
        try {
            if (routingControl) {
                mapRef.current.removeControl(routingControl);
            }
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
                    styles: [{ color: 'blue', weight: 4 }]
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

                setRoutesInfo((prevRoutes) => [
                    ...prevRoutes,
                    { latitude, longitude, distanceKm, marker, hinh_anh: quan.hinh_anh, ten_quan_an: quan.ten_quan_an, dia_chi: quan.dia_chi, gio_mo_cua: quan.gio_mo_cua, gio_dong_cua: quan.gio_dong_cua, id_quanan: quan.id_quanan },
                ]);
            });
        } catch (error) {
            console.log("Có lỗi khi tạo tuyến đường", error);
        }
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