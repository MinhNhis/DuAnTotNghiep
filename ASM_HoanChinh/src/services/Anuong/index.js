import request from "../../config/ApiConfig";

const anuong = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/anuongs",
    });
    return res;
  } catch (error) {
    console.error("Lỗi csdl:", error);
  }
};

const getAnuongById = async (id_anuong) => {
  const res = await request({
    method: "GET",
    path: `/api/anuongs/${id_anuong}`,
  });
  return res;
};

const addanuong = async (newAnuong) => {
  try {
    const res = await request({
      method: "POST",
      path: "api/anuongs",
      data: newAnuong,
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi thêm bãi đỗ xe:", error);
    throw error;
  }
};
const putanuong = async (id_anuong, { an_uong }) => {
  try {
    const res = await request({
      method: "PUT",
      path: `api/anuongs/${id_anuong}`,
      data: { an_uong: an_uong },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi cập nhật bãi đỗ xe:", error);
    throw error;
  }
};

const deleteAnuong = async (id_anuong) => {
  const res = await request({
    method: "DELETE",
    path: `api/anuongs/${id_anuong}`,
  });

  return res;
};

export { anuong, addanuong, putanuong, getAnuongById, deleteAnuong };
