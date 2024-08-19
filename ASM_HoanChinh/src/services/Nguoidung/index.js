import request from "../../config/ApiConfig";

const getNguoiDung = async () => {
    const res = await request({
        method: "GET",
        path:"/api/nguoidungs"
    });

    return res
}

const getNguoiDungById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/nguoidungs/${id}`
    });

    return res
}

const addNguoiDung = async ({ten_nguoi_dung,mat_khau, email, vai_tro}) => {
    
    const res = await request({
        method: "POST",
        path: "api/nguoidungs",
        data: {
            ten_nguoi_dung: ten_nguoi_dung,
            mat_khau : mat_khau,
            email: email,
            vai_tro: vai_tro,
        }
    })

    return res
}

const editNguoiDung = async (id, {ten_nguoi_dung, mat_khau, email, vai_tro}) => {
    
    const res = await request({
        method: "PUT",
        path: `api/nguoidungs/${id}`,
        data: {
            ten_nguoi_dung: ten_nguoi_dung,
            mat_khau : mat_khau,
            email: email,
            vai_tro: vai_tro,
        }
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

export {getNguoiDung, getNguoiDungById, addNguoiDung, editNguoiDung, deleteNguoiDung}