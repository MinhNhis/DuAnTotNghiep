import request from "../../config/ApiConfig";

const getLKH = async () => {
    const res = await request({
        method: "GET",
        path:"/api/loaikh"
    });

    return res
}

const getLKHById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/loaikh/${id}`
    });

    return res
}

const addLKH = async ({khach_hang}) => {
    
    const res = await request({
        method: "POST",
        path: "api/loaikh",
        data: {
            khach_hang: khach_hang
        }
    })

    return res
}

const editLKH = async (id, {khach_hang}) => {
    
    const res = await request({
        method: "PUT",
        path: `api/loaikh/${id}`,
        data: {
            khach_hang: khach_hang
        }
    })

    return res
}

const deleteLKH = async (id) => {
    
    const res = await request({
        method: "DELETE",
        path: `api/loaikh/${id}`,
        data: null
    })

    return res
}

export {getLKH, getLKHById, addLKH, editLKH, deleteLKH}