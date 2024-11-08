import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [position, setPosition] = useState({
    latitude: null,  
    longitude: null,
    loading: true,   
    error: null, 
  });

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setPosition((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      }));
      return;
    }

    // Hàm thành công
    function onSuccess(position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        error: null,
      });
    }

    // Hàm lỗi
    function onError(error) {
      setPosition((prev) => ({
        ...prev,
        error: `Error retrieving geolocation: ${error.message}`,
        loading: false,
      }));
    }

    // Lấy tọa độ ban đầu ngay lập tức
    geo.getCurrentPosition(onSuccess, onError);

    // Theo dõi thay đổi vị trí
    const watcher = geo.watchPosition(onSuccess, onError);

    // Hủy theo dõi khi component bị unmount
    return () => geo.clearWatch(watcher);
  }, []);

  return position;
}
