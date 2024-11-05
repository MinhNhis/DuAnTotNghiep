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

const addQuanan = async ({ ten_quan_an, hinh_anh, dia_chi, lat, lng, dien_thoai, gio_mo_cua, gio_dong_cua, link_website, link_facebook, id_gioithieu, so_luong_cho, created_user }) => {
    const data = new FormData();
    data.append("ten_quan_an", ten_quan_an);
    data.append("dia_chi", dia_chi);
    data.append("lat", lat);
    data.append("lng", lng);
    data.append("dien_thoai", dien_thoai);
    data.append("gio_mo_cua", gio_mo_cua);
    data.append("gio_dong_cua", gio_dong_cua);
    data.append("link_website", link_website);
    data.append("link_facebook", link_facebook);
    data.append("id_gioithieu", id_gioithieu);
    data.append("created_user", created_user);
    data.append("so_luong_cho", so_luong_cho);
    data.append("mo_ta", mo_ta);
    if (tiennghiIds) {
        tiennghiIds.forEach((e, index) => {
            data.append(`tiennghiIds[${index}]`, e);
        });
    }

    if (dichvuIds) {
        dichvuIds.forEach((e, index) => {
            data.append(`dichvuIds[${index}]`, e);
        });
    }

    if (khongkhiIds) {
        khongkhiIds.forEach((e, index) => {
            data.append(`khongkhiIds[${index}]`, e);
        });
    }

    if (kehoachIds) {
        kehoachIds.forEach((e, index) => {
            data.append(`kehoachIds[${index}]`, e);
        });
    }

    if (baidoxeIds) {
        baidoxeIds.forEach((e, index) => {
            data.append(`baidoxeIds[${index}]`, e);
        });
    }

    if (loaikhIds) {
        loaikhIds.forEach((e, index) => {
            data.append(`loaikhIds[${index}]`, e);
        });
    }

    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "POST",
        path: "api/quanans",
        data: data
    })

    return res
}

const editQuanan = async (id, { ten_quan_an, hinh_anh, dia_chi, lat, lng, dien_thoai, gio_mo_cua, gio_dong_cua, link_website, link_facebook, id_gioithieu, so_luong_cho, created_user, updated_user }) => {
    const data = new FormData();
    data.append("ten_quan_an", ten_quan_an);
    data.append("dia_chi", dia_chi);
    data.append("lat", lat);
    data.append("lng", lng);
    data.append("dien_thoai", dien_thoai);
    data.append("gio_mo_cua", gio_mo_cua);
    data.append("gio_dong_cua", gio_dong_cua);
    data.append("link_website", link_website);
    data.append("link_facebook", link_facebook);
    data.append("id_gioithieu", id_gioithieu);
    data.append("so_luong_cho", so_luong_cho);
    data.append("mo_ta", mo_ta);
    data.append("created_user", created_user);
    data.append("updated_user", updated_user);
    tiennghiIds.forEach((e, index) => {
        data.append(`tiennghiIds[${index}]`, e);
    });
    dichvuIds.forEach((e, index) => {
        data.append(`dichvuIds[${index}]`, e);
    });
    khongkhiIds.forEach((e, index) => {
        data.append(`khongkhiIds[${index}]`, e);
    });
    kehoachIds.forEach((e, index) => {
        data.append(`kehoachIds[${index}]`, e);
    });
    baidoxeIds.forEach((e, index) => {
        data.append(`baidoxeIds[${index}]`, e);
    });
    loaikhIds.forEach((e, index) => {
        data.append(`loaikhIds[${index}]`, e);
    });
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);
    const res = await request({
        method: "PUT",
        path: `api/quanans/${id}`,
        data: data
    })

    return res
}

const deleteQuanan = async (id, { id_nguoidung, reason, role }) => {

    const res = await request({
        method: "DELETE",
        path: `api/quanans/${id}`,
        data: {
            reason: reason,
            id_nguoidung: id_nguoidung,
            role: role,
        }
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

const searchQuanan = async (keyword) => {
    const res = await request({
        method: 'GET',
        path: `/api/search-quanan?keyword=${keyword}`
    })

    return res
}


const getTiennghi = async () => {
    const res = await request({
        method: "GET",
        path: "/api/tiennghis"
    });

    return res
}

export {paginator, getQuanan, getQuananById, addQuanan, editQuanan, deleteQuanan, searchQuanan, getTiennghi}