import request from "../../config/ApiConfig";

const baiviet = async () => {
  try {
    const res = await request({
      method: "GET",
      path: "/api/baiviets",
    });
    return res;
  } catch (error) {
    console.error("Lỗi csdl:", error);
  }
};

const addbaiviet = async ({ tieu_de, noi_dung, hinh_anh, ngay_dang, created_user }) => {
  const formData = new FormData();

  formData.append("tieu_de", tieu_de);
  formData.append("noi_dung", noi_dung);
  formData.append("hinh_anh", hinh_anh);
  formData.append("ngay_dang", ngay_dang);
  formData.append("created_user", created_user);

  try {
    const res = await request({
      method: "POST",
      path: "api/baiviets",
      data: formData,
    });

    return res;
  } catch (error) {
    console.error("Lỗi khi thêm bài viết:", error);
    throw error;
  }
};

const getBaivietById = async (id_baiviet) => {
  const res = await request({
    method: "GET",
    path: `/api/baiviets/${id_baiviet}`,
  });
  return res;
};

const updatebaiviet = async (id_baiviet, { tieu_de, noi_dung, hinh_anh, ngay_dang, created_user }) => {
  const formData = new FormData();

  formData.append("tieu_de", tieu_de);
  formData.append("noi_dung", noi_dung);
  formData.append("hinh_anh", hinh_anh);
  formData.append("ngay_dang", ngay_dang);
  formData.append("created_user", created_user);

  const res = await request({
    method: "PUT",
    path: `api/baiviets/${id_baiviet}`,
    data: formData
  })
  return res
}

const deletebaiviet = async (id_baiviet) => {
  const res = await request({
    method: "DELETE",
    path: `api/baiviets/${id_baiviet}`,
  });

  return res;
};

const paginator = async (page) => {
  const res = await request({
      method: "GET",
      path: `/api/paginator-baiviet?page=${page}&limit=5`
  })
  return res
}

export { baiviet, addbaiviet, deletebaiviet, updatebaiviet, getBaivietById, paginator };