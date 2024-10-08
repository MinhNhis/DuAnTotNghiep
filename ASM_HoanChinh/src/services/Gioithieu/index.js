import request from "../../config/ApiConfig";

const getGioithieu = async () => {
    const res = await request({
        method: "GET",
        path: "/api/gioi-thieu"
    });

    return res
}

const getGioithieuById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/gioi-thieu/${id}`
    });

    return res
}

const addGioithieu = async ({ gioi_thieu, id_tuychondichvu, id_dichvu, id_baidoxe, id_anuong, id_khongkhi, id_loaikh, id_kehoach, id_tiennghi, created_user }) => {

    const res = await request({
        method: "POST",
        path: "api/gioi-thieu",
        data: {
            gioi_thieu: gioi_thieu,
            id_tuychondichvu: id_tuychondichvu,
            id_dichvu: id_dichvu,
            id_baidoxe: id_baidoxe,
            id_anuong: id_anuong,
            id_khongkhi: id_khongkhi,
            id_loaikh: id_loaikh,
            id_kehoach: id_kehoach,
            id_tiennghi: id_tiennghi,
            created_user: created_user,
            updated_user: null
        }
    })

    return res
}

const editGioithieu = async (id, { gioi_thieu, id_tuychondichvu, id_dichvu, id_baidoxe, id_anuong, id_khongkhi, id_loaikh, id_kehoach, id_tiennghi, created_user, updated_user }) => {

    const res = await request({
        method: "PUT",
        path: `api/gioi-thieu/${id}`,
        data: {
            gioi_thieu: gioi_thieu,
            id_tuychondichvu: id_tuychondichvu,
            id_dichvu: id_dichvu,
            id_baidoxe: id_baidoxe,
            id_anuong: id_anuong,
            id_khongkhi: id_khongkhi,
            id_loaikh: id_loaikh,
            id_kehoach: id_kehoach,
            id_tiennghi: id_tiennghi,
            created_user: created_user,
            updated_user: updated_user
        }
    })

    return res
}

const deleteGioithieu = async (id) => {

    const res = await request({
        method: "DELETE",
        path: `api/gioi-thieu/${id}`,
        data: null
    })

    return res
}

const getBaidoxe = async () => {
    const res = await request({
        method: "GET",
        path: "/api/baidoxes"
    });

    return res
}

const getKehoach = async () => {
    const res = await request({
        method: "GET",
        path: "/api/kehoachs"
    });

    return res
}

const getKhachhang = async () => {
    const res = await request({
        method: "GET",
        path: "/api/loaikh"
    });

    return res
}

const getKhongkhi = async () => {
    const res = await request({
        method: "GET",
        path: "/api/khongkhis"
    });

    return res
}

const getTiennghi = async () => {
    const res = await request({
        method: "GET",
        path: "/api/tiennghis"
    });

    return res
}

const getCacDichvu = async () => {
    const res = await request({
        method: "GET",
        path: "/api/cacdichvu"
    });

    return res
}

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-gioithieu?page=${page}&limit=8`
    })

    return res
}



export { getGioithieu, addGioithieu, getGioithieuById, editGioithieu, deleteGioithieu, getBaidoxe, getCacDichvu, getKehoach, getKhachhang, getKhongkhi, getTiennghi,paginator }