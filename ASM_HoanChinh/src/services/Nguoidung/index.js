import request from "../../config/ApiConfig";

const getNguoiDung = async () => {
    const res = await request({
        method: "GET",
        path: "/api/nguoidungs"
    });

    return res
}

const getNguoiDungById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/nguoidungs/${id}`
    });

    return res
}

const addNguoiDung = async ({ ten_nguoi_dung, hinh_anh, mat_khau, email, so_dien_thoai, ngay_sinh, gioi_tinh, dia_chi, vai_tro }) => {
    const data = new FormData();
    data.append("ten_nguoi_dung", ten_nguoi_dung);
    data.append("mat_khau", mat_khau);
    data.append("email", email);
    data.append("so_dien_thoai", so_dien_thoai);
    data.append("ngay_sinh", ngay_sinh);
    data.append("gioi_tinh", gioi_tinh);
    data.append("dia_chi", dia_chi);
    data.append("vai_tro", vai_tro);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);

    try {
        const res = await request({
            method: "POST",
            path: "api/nguoidungs",
            data: data,
        });

        return res;
    } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        throw error;
    }
}

const editNguoiDung = async (id, { ten_nguoi_dung, hinh_anh, mat_khau, email, so_dien_thoai, ngay_sinh, gioi_tinh, dia_chi, vai_tro }) => {
    const data = new FormData();
    data.append("ten_nguoi_dung", ten_nguoi_dung);
    data.append("mat_khau", mat_khau);
    data.append("email", email);
    data.append("so_dien_thoai", so_dien_thoai);
    data.append("ngay_sinh", ngay_sinh);
    data.append("gioi_tinh", gioi_tinh);
    data.append("dia_chi", dia_chi);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);

    const res = await request({
        method: "PUT",
        path: `api/nguoidungs/${id}`,
        data: data
    })

    return res
}

const deleteNguoiDung = async (id) => {

    const res = await request({
        method: "DELETE",
        path: `api/nguoidungs/${id}`,
        data: null
    })

    return res
}

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-nguoidung?page=${page}&limit=10`
    })

    return res
}

export {paginator, getNguoiDung, getNguoiDungById, addNguoiDung, editNguoiDung, deleteNguoiDung }