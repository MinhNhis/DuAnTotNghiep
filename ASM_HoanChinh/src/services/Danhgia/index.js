import request from "../../config/ApiConfig";

const getDanhgia = async () => {
    const res = await request({
        method: "GET",
        path:"/api/danhgias"
    });

    return res
}

const getDanhgiaById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/danhgias/${id}`
    });

    return res
}

const addDanhgia = async ({binh_luan, sao, hinh_anh, danh_gia_dich_vu, danh_gia_do_an, 
    danh_gia_khong_khi, id_quanan, id_nguoidung}) => {
    const data = new FormData();
    data.append("binh_luan", binh_luan);
    data.append("sao", sao);
    data.append("danh_gia_dich_vu", danh_gia_dich_vu);
    data.append("danh_gia_do_an", danh_gia_do_an);
    data.append("danh_gia_khong_khi", danh_gia_khong_khi);
    data.append("id_quanan", id_quanan);
    data.append("id_nguoidung", id_nguoidung);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "POST",
        path: "api/danhgias",
        data: data
    })

    return res
}

const editDanhgia = async (id, {binh_luan, sao, hinh_anh, danh_gia_dich_vu, danh_gia_do_an, 
    danh_gia_khong_khi, id_quanan, id_nguoidung}) => {
        const data = new FormData();
        data.append("binh_luan", binh_luan);
        data.append("sao", sao);
        data.append("danh_gia_dich_vu", danh_gia_dich_vu);
        data.append("danh_gia_do_an", danh_gia_do_an);
        data.append("danh_gia_khong_khi", danh_gia_khong_khi);
        data.append("id_quanan", id_quanan);
        data.append("id_nguoidung", id_nguoidung);
        // Gửi 1 ảnh
        data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "PUT",
        path: `api/danhgias/${id}`,
        data: data
    })

    return res
}

const deleteDanhgia = async (id) => {
    
    const res = await request({
        method: "DELETE",
        path: `api/danhgias/${id}`,
        data: null
    })

    return res
}

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-danhgia?page=${page}&limit=8`
    })

    return res
}

export {getDanhgia, getDanhgiaById, addDanhgia, editDanhgia, deleteDanhgia,paginator}