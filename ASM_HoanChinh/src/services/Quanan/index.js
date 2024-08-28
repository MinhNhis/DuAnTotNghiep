import request from "../../config/ApiConfig";

const getQuanan = async () => {
    const res = await request({
        method: "GET",
        path:"/api/quanans"
    });

    return res
}

const getQuananById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/quanans/${id}`
    });

    return res
}

const addQuanan = async ({ten_quan_an, hinh_anh, dia_chi, dien_thoai, 
    gio_hoat_dong, link_website, link_facebook, id_gioithieu}) => {
    const data = new FormData();
    data.append("ten_quan_an", ten_quan_an);
    data.append("dia_chi", dia_chi);
    data.append("dien_thoai", dien_thoai);
    data.append("gio_hoat_dong", gio_hoat_dong);
    data.append("link_website", link_website);
    data.append("link_facebook", link_facebook);
    data.append("id_gioithieu", id_gioithieu);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "POST",
        path: "api/quanans",
        data: data
    })

    return res
}

const editQuanan = async (id, {ten_quan_an, hinh_anh, dia_chi, dien_thoai, 
    gio_hoat_dong, link_website, link_facebook, id_gioithieu}) => {
        const data = new FormData();
        data.append("ten_quan_an", ten_quan_an);
        data.append("dia_chi", dia_chi);
        data.append("dien_thoai", dien_thoai);
        data.append("gio_hoat_dong", gio_hoat_dong);
        data.append("link_website", link_website);
        data.append("link_facebook", link_facebook);
        data.append("id_gioithieu", id_gioithieu);
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

export {getQuanan, getQuananById, addQuanan, editQuanan, deleteQuanan}