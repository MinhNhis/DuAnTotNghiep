import request from "../../config/ApiConfig";

const kehoach = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/kehoachs",
    });
    return res; 
  } catch (error) {
    console.error("Lỗi csdl:", error);
  }
};

const addkehoach = async (newKehoach) => {
  try {
    const res = await request({
      method: "POST",
      path: "api/kehoachs",
      data: newKehoach, 
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi thêm kế hoạch:", error);
    throw error; 
  }
};
const getKehoachById = async (id_kehoach) => {
  
  const res = await request({
      method: "GET",
      path: `/api/kehoachs/${id_kehoach}`,
  });
  return res;
}

const putKehoach = async (id_kehoach, {ke_hoach}) => {
  try {
    const res = await request({
      method: "PUT",
      path: `api/kehoachs/${id_kehoach}`,
      data: { ke_hoach: ke_hoach },
    });
    return res;
  } catch (error) {
    console.error("Lỗi khi cập nhật kế hoạch:", error);
    throw error;
  }
};

const deleteKehoach = async (id_kehoach) => {
  const res = await request({
      method: "DELETE",
      path: `api/kehoachs/${id_kehoach}`,
  });

  return res;
};

export { addkehoach, kehoach, getKehoachById, putKehoach , deleteKehoach };
