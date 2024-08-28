import axios from "axios";
import { Cookies } from "react-cookie";

export const BASE_URL = "http://127.0.0.1:3300";

const request = async ({
  method = "GET",
  path = "",
  data = {},
  headers = {},
}) => {
  try {
    const cookie = new Cookies();
    const token = cookie.get("token");

    const res = await axios({
      method: method,
      baseURL: BASE_URL,
      url: path,
      data: data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    //alert(error?.response?.data?.message || "Error");
    throw error;
    //return null;
  }
};

export default request;
