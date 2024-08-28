import request from "../../config/ApiConfig";

const tiennghi = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/tiennghis",
    });
    return res;
  } catch (error) {
    console.error("Lỗi csdl:", error);
    return [];
  }
};
const getTiennghiById = async (id_tiennghi) => {
  const res = await request({
    method: "GET",
    path: `/api/tiennghis/${id_tiennghi}`,
  });
  return res;
};
const addtiennghi = async ({ tien_nghi, created_user }) => {
  try {
    const res = await request({
      method: "POST",
      path: "api/tiennghis",
      data: {
        tien_nghi: tien_nghi,
        created_user: created_user,
        updated_user: null
      },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi thêm không khí:", error);
    throw error;
  }
};
const puttiennghi = async (id_tiennghi, { tien_nghi, created_user, updated_user }) => {
  try {
    const res = await request({
      method: "PUT",
      path: `api/tiennghis/${id_tiennghi}`,
      data: {
        tien_nghi: tien_nghi,
        created_user: created_user,
        updated_user: updated_user
      },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi cập nhật bãi đỗ xe:", error);
    throw error;
  }
};

const deleteTiennghi = async (id_tiennghi) => {
  const res = await request({
    method: "DELETE",
    path: `api/tiennghis/${id_tiennghi}`,
  });

  return res;
};

export { addtiennghi, tiennghi, getTiennghiById, puttiennghi, deleteTiennghi };
