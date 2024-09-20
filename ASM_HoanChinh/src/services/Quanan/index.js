import request from "../../config/ApiConfig";

const getQuanan = async () => {
    const res = await request({
        method: "GET",
        path: "/api/quanans"
    });

    return res
}

const getQuananById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/quanans/${id}`
    });

    return res
}

const addQuanan = async ({ ten_quan_an, hinh_anh, dia_chi, dien_thoai, gio_hoat_dong, link_website, link_facebook, id_gioithieu, so_luong_cho, created_user }) => {
    const data = new FormData();
    data.append("ten_quan_an", ten_quan_an);
    data.append("dia_chi", dia_chi);
    data.append("dien_thoai", dien_thoai);
    data.append("gio_hoat_dong", gio_hoat_dong);
    data.append("link_website", link_website);
    data.append("link_facebook", link_facebook);
    data.append("id_gioithieu", id_gioithieu);
    data.append("created_user", created_user);
    data.append("so_luong_cho", so_luong_cho);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "POST",
        path: "api/quanans",
        data: data
    })

    return res
}

const editQuanan = async (id, { ten_quan_an, hinh_anh, dia_chi, dien_thoai, gio_hoat_dong, link_website, link_facebook, id_gioithieu, so_luong_cho, created_user, updated_user }) => {
    const data = new FormData();
    data.append("ten_quan_an", ten_quan_an);
    data.append("dia_chi", dia_chi);
    data.append("dien_thoai", dien_thoai);
    data.append("gio_hoat_dong", gio_hoat_dong);
    data.append("link_website", link_website);
    data.append("link_facebook", link_facebook);
    data.append("id_gioithieu", id_gioithieu);
    data.append("so_luong_cho", so_luong_cho);
    data.append("created_user", created_user);
    data.append("updated_user", updated_user);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "PUT",
        path: `api/quanans/${id}`,
        data: data
    })

    return res
}

const deleteQuanan = async (id) => {

    const res = await request({
        method: "DELETE",
        path: `api/quanans/${id}`,
        data: null
    })

    return res
}

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-quanan?page=${page}&limit=8`
    })

    return res
}

const searchQuanan = async(keyword) =>{
    const res = await request({
        method: 'GET',
        path: `/api/search-quanan?keyword=${keyword}`
    })

    return res
}

export {paginator, getQuanan, getQuananById, addQuanan, editQuanan, deleteQuanan, searchQuanan}