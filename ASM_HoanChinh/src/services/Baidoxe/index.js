import request from "../../config/ApiConfig";

const baidoxe = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/baidoxes",
    });
    return res;
  } catch (error) {
    console.error("Lỗi csdl:", error);
  }
};

const getBaidoxeById = async (id_baidoxe) => {
  const res = await request({
    method: "GET",
    path: `/api/baidoxes/${id_baidoxe}`,
  });
  return res;
};

const addbaidoxe = async ({ bai_do_xe, created_user }) => {
  try {
    const res = await request({
      method: "POST",
      path: "api/baidoxes",
      data: {
        bai_do_xe: bai_do_xe,
        created_user: created_user,
        updated_user: null
      },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi thêm bãi đỗ xe:", error);
    throw error;
  }
};
const putbaidoxe = async (id_baidoxe, { bai_do_xe, created_user, updated_user }) => {
  try {
    const res = await request({
      method: "PUT",
      path: `api/baidoxes/${id_baidoxe}`,
      data: {
        bai_do_xe: bai_do_xe,
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

const deleteBaidoxe = async (id_baidoxe) => {
  const res = await request({
    method: "DELETE",
    path: `api/baidoxes/${id_baidoxe}`,
  });

  return res;
};

export { baidoxe, addbaidoxe, putbaidoxe, getBaidoxeById, deleteBaidoxe };
