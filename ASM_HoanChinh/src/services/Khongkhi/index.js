import request from "../../config/ApiConfig";

const khongkhi = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/khongkhis",
    });
    return res;
  } catch (error) {
    console.error("Lỗi csdl:", error);
  }
};
const getKhongkhiById = async (id_khongkhi) => {
  
  const res = await request({
      method: "GET",
      path: `/api/khongkhis/${id_khongkhi}`,
  });
  return res;
}
const addkhongkhi = async (newKhongkhi) => {
  try {
    const res = await request({
      method: "POST",
      path: "/api/khongkhis",
      data: newKhongkhi,
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi thêm không khí:", error);
    throw error;
  }
};
const putkhongkhi = async (id_khongkhi, {khong_khi}) => {
  try {
    const res = await request({
      method: "PUT",
      path: `api/khongkhis/${id_khongkhi}`,
      data: { khong_khi: khong_khi },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi cập nhật không khí:", error);
    throw error;
  }
};

const deleteKhongkhi = async (id_khongkhi) => {
  const res = await request({
      method: "DELETE",
      path: `api/khongkhis/${id_khongkhi}`,
  });

  return res;
};


export { addkhongkhi, khongkhi, getKhongkhiById , putkhongkhi, deleteKhongkhi};
