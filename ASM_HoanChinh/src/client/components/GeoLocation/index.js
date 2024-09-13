import axios from "axios";

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

export default geocodeAddress