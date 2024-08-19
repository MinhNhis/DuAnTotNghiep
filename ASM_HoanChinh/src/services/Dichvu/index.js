import request from "../../config/ApiConfig";

const getDichvu = async () => {
    const res = await request({
        method: "GET",
        path:"/api/dich-vu"
    });

    return res
}

const getDichvuById = async (id) => {
    const res = await request({
        method: "GET",
        path:`/api/dich-vu/${id}`
    });

    return res
}

const addDichvu = async ({dich_vu}) => {
    
    const res = await request({
        method: "POST",
        path: "api/dich-vu",
        data: {
            dich_vu: dich_vu
        }
    })

    return res
}

const editDichvu = async (id, {dich_vu}) => {
    
    const res = await request({
        method: "PUT",
        path: `api/dich-vu/${id}`,
        data: {
            dich_vu: dich_vu
        }
    })

    return res
}

const deleteDichvu = async (id) => {
    
    const res = await request({
        method: "DELETE",
        path: `api/dich-vu/${id}`,
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
export {getDichvu, getDichvuById, addDichvu, editDichvu, deleteDichvu, getQuanan}