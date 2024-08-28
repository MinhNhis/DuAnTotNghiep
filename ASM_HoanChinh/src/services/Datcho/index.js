import request from "../../config/ApiConfig";

const getDatcho = async () => {
    const res = await request({
        method: "GET",
        path:"/api/dat-cho"
    });

    return res
}

const getDatchoById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/dat-cho/${id}`
    });

    return res
}

const addDatcho = async ({ten_quan,ten_kh,sdt_kh,email_kh,thoi_gian_dat,so_luong_nguoi,trang_thai,yeu_cau_khac,id_nguoidung, id_quanan}) => {
    
    const res = await request({
        method: "POST",
        path: "api/dat-cho",
        data: {
            ten_quan: ten_quan,
            ten_kh: ten_kh,
            sdt_kh: sdt_kh,
            email_kh: email_kh,
            thoi_gian_dat: thoi_gian_dat,
            so_luong_nguoi: so_luong_nguoi,
            trang_thai: trang_thai,
            yeu_cau_khac: yeu_cau_khac,
            id_nguoidung: id_nguoidung,
            id_quanan: id_quanan
            
        }
    })

    return res
}

const editDatcho = async (id, {ten_quan,ten_kh,sdt_kh,email_kh,thoi_gian_dat,so_luong_nguoi,trang_thai,yeu_cau_khac,id_nguoidung, id_quanan}) => {
    
    const res = await request({
        method: "PUT",
        path: `api/dat-cho/${id}`,
        data: {
            ten_quan: ten_quan,
            ten_kh: ten_kh,
            sdt_kh: sdt_kh,
            email_kh: email_kh,
            thoi_gian_dat: thoi_gian_dat,
            so_luong_nguoi: so_luong_nguoi,
            trang_thai: trang_thai,
            yeu_cau_khac: yeu_cau_khac,
            id_nguoidung: id_nguoidung,
            id_quanan
        }
    })

    return res
}

const deleteDatcho = async (id) => {
    
    const res = await request({
        method: "DELETE",
        path: `api/dat-cho/${id}`,
        data: null
    })

    return res
}

const getQuanan = async () => {
    const res = await request({
        method: "GET",
        path:"/api/quanans"
    });

    return res
}

const getKhachhang = async () => {
    const res = await request({
        method: "GET",
        path:"/api/nguoidungs"
    });

    return res
}

export {getDatcho, getDatchoById, addDatcho, editDatcho, deleteDatcho, getQuanan, getKhachhang}