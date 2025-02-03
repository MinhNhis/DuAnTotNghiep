import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScriptNext, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { BASE_URL } from '../../../config/ApiConfig';
import { Link } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import useLocalStorage from "./useLocalStorage";
import './style.css';
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};
const center = {
  lat: 9.981928881882581,
  lng: 105.75831424635241,
};

const Map = ({ quanan, sizeData }) => {
  const [userLocation, setUserLocation] = useState(center);
  const [quanclick, setSelectedPlace] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const directionsService = useRef(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const directionsPanelRef = useRef(null);
  const [directionsResponses, setDirectionsResponses] = useState([]);
  const [quanan5kmlocal, setQuanan5Km] = useLocalStorage("QUAN_AN5KM", []);
  useEffect(() => {
    let intervalId;

    if (navigator.geolocation) {
      const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Không thể lấy vị trí người dùng:", error.message);
          }
        );
      };
      fetchLocation();
      intervalId = setInterval(fetchLocation, 3000);
    } else {
      console.error("Trình duyệt của bạn không hỗ trợ Geolocation.");
      alert("Trình duyệt không hỗ trợ lấy vị trí.");
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
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

  const calculateRoute = async (destination, mode = "DRIVING") => {
    try {
      if (!directionsService.current) {
        directionsService.current = new window.google.maps.DirectionsService();
      }
      if (!userLocation || !destination) {
        alert("Vui lòng chọn địa điểm hợp lệ.");
        return;
      }
      setDirectionsResponse(null);
      if (directionsPanelRef.current) {
        directionsPanelRef.current.innerHTML = "";
      }
      const result = await directionsService.current.route({
        origin: userLocation,
        destination,
        travelMode: window.google.maps.TravelMode[mode],
      });
      setDirectionsResponse(result);
      console.log(result);

      const leg = result.routes[0].legs[0];
      setRouteInfo({
        distance: leg.distance.text,
        duration: leg.duration.text,
      });
    } catch (error) {
      console.error("Lỗi khi tính toán tuyến đường:", error);
      // alert("Không thể tính toán tuyến đường. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const calculateRoutes = async () => {
      try {
        if (!directionsService.current) {
          directionsService.current = new window.google.maps.DirectionsService();
        }

        const responses = [];
        for (const quan of quanan) {
          const result = await directionsService.current.route({
            origin: userLocation,
            destination: { lat: quan.lat, lng: quan.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          });
          const distanceText = result.routes[0]?.legs[0]?.distance?.text;
          const distanceValue = result.routes[0]?.legs[0]?.distance?.value;

          if (distanceValue && distanceValue <= 5000 && quan.is_delete === 0) {
            setQuanan5Km((prevQuan) => {
              const isDuplicate = prevQuan.some(existingQuan => existingQuan.id_quanan === quan.id_quanan);
              if (!isDuplicate) {
                return [...prevQuan, { ...quan, distanceValue }];
              }
              return prevQuan;
            });
            responses.push(result);
          }
        }

        setDirectionsResponses(responses);
      } catch (error) {
        console.error("Lỗi tính toán tuyến đường:", error);
      }
    };

    if (quanan.length > 0 && userLocation) {
      calculateRoutes();
    }
  }, [quanan]);


  useEffect(() => {
    if (quanan) {
      if (quanan.length <= 1 && quanan[0]) {
        const firstQuan = quanan[0];
        setSelectedPlace(firstQuan);
        calculateRoute({ lat: firstQuan.lat, lng: firstQuan.lng }, travelMode);
      }
    }
  }, [quanan, travelMode]);

  return quanan ? (
    <div style={{ display: "flex" }}>
      {sizeData <= 1 && (
        <div style={{ width: "35%", padding: "10px" }}>
          <div className="travel-mode-container">
            <button
              className={`travel-button ${travelMode === 'DRIVING' ? 'selected' : ''}`}
              onClick={() => setTravelMode('DRIVING')}
            >
              <DirectionsCarIcon />
            </button>

            <button
              className={`travel-button ${travelMode === 'WALKING' ? 'selected' : ''}`}
              onClick={() => setTravelMode('WALKING')}
            >
              <DirectionsWalkIcon />
            </button>

            <button
              className={`travel-button ${travelMode === 'BICYCLING' ? 'selected' : ''}`}
              onClick={() => setTravelMode('BICYCLING')}
            >
              <DirectionsBikeIcon />
            </button>

            <button
              className={`travel-button ${travelMode === 'TRANSIT' ? 'selected' : ''}`} disabled
              onClick={() => setTravelMode('TRANSIT')}
            >
              <DirectionsTransitIcon sx={{ color: '#C0C0C0' }} />
            </button>
          </div>
          <div ref={directionsPanelRef} style={{ marginTop: "10px", height: "87vh", overflowY: "auto" }}>
            <h4>Bảng chỉ đường</h4>
          </div>
        </div>
      )}
      <LoadScriptNext googleMapsApiKey="AIzaSyBzpubjljfcqi-sdF4Ta6sOqjCljxttN38">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
          zoom={13}
          options={{
            mapTypeControl: sizeData === 1 ? true : false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true,
          }}
        >
          {userLocation && (
            <Marker position={userLocation} label="Vị trí hiện tại" />
          )}

          {quanan.map((quan, index) => (
            <React.Fragment key={index}>
              {sizeData > 1? <Marker
                position={userLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
              : null}
              {quan.is_delete === 0 && sizeData > 1 ? (
                <Marker
                  position={{ lat: quan.lat, lng: quan.lng }}
                  label={{
                    text: quan.ten_quan_an,
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  icon={{
                    url: isOpen(quan.gio_mo_cua, quan.gio_dong_cua) ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    ,
                    scaledSize: new window.google.maps.Size(50, 50),
                  }}
                  onClick={() => {
                    setSelectedPlace(quan);
                    calculateRoute({ lat: quan.lat, lng: quan.lng }, travelMode);
                  }}
                />
              ) : null}
            </React.Fragment>
          ))}
          {quanclick && (
            <InfoWindow
              position={{ lat: quanclick.lat, lng: quanclick.lng }}
              onCloseClick={() => sizeData <= 1 ? setSelectedPlace(quanclick) : setSelectedPlace(null)}
            >
              <div>
                <Link to={`/chi-tiet/${quanclick.id_quanan}`}>
                  <div style={{ width: "200px", textAlign: "center" }}>
                    <img
                      src={`${BASE_URL}/uploads/${quanclick.hinh_anh}`}
                      alt={quanclick.ten_quan_an}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <h6 style={{ margin: "5px 0" }}>{quanclick.ten_quan_an}</h6>
                    <div
                      className="mb-1"
                      style={{
                        color: isOpen(quanclick.gio_mo_cua, quanclick.gio_dong_cua) ? "green" : "red",
                        margin: "3px 0",
                      }}
                    >
                      {isOpen(quanclick.gio_mo_cua, quanclick.gio_dong_cua) ? (
                        <p style={{ fontSize: "12px", margin: "0" }}>
                          {quanclick.gio_mo_cua} - {quanclick.gio_dong_cua} Đang mở cửa
                        </p>
                      ) : (
                        <p style={{ fontSize: "12px", margin: "0" }}>
                          {quanclick.gio_mo_cua} - {quanclick.gio_dong_cua} Đã đóng cửa
                        </p>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", margin: "0", color: "black" }}>{quanclick.dia_chi}</p>
                    {routeInfo && (
                      <div style={{ fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                        <p style={{ margin: "5px 0", flex: 1, color: "black" }}>
                          {routeInfo.distance}, {routeInfo.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </InfoWindow>

          )}
          {directionsResponse && sizeData <= 1 ?
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                polylineOptions: {
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 6,
                },
                draggable: true,
                suppressMarkers: false,
              }}
              onLoad={(directionsRenderer) => {
                if (directionsPanelRef.current) {
                  directionsPanelRef.current.innerHTML = "";
                  directionsRenderer.setPanel(directionsPanelRef.current);
                }
              }}
            /> :
            null
          }
          {directionsResponses.map((response, index) =>
            sizeData > 1 ? (
              <DirectionsRenderer
                key={index}
                directions={response}
                options={{
                  polylineOptions: {
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 6,
                  },
                  draggable: true,
                  suppressMarkers: true,
                }}
                onLoad={(directionsRenderer) => {
                  if (directionsPanelRef.current) {
                    directionsPanelRef.current.innerHTML = "";
                    directionsRenderer.setPanel(directionsPanelRef.current);
                  }
                }}
              />
            ) : null
          )}

        </GoogleMap>
      </LoadScriptNext>
    </div>
  ) : null;
};

export default React.memo(Map);