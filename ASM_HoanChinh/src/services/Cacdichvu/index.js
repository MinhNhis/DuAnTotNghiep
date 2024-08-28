import request from "../../config/ApiConfig";

const getCDV = async () => {
    const res = await request({
        method: "GET",
        path: "/api/cacdichvu"
    });

    return res
}

const getCDVById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/cacdichvu/${id}`
    });

    return res
}

const addCDV = async ({ tuy_chon_dv, created_user }) => {

    const res = await request({
        method: "POST",
        path: "api/cacdichvu",
        data: {
            tuy_chon_dv: tuy_chon_dv,
            created_user: created_user,
            updated_user: null
        }
    })

    return res
}

const editCDV = async (id, { tuy_chon_dv, created_user, updated_user }) => {

    const res = await request({
        method: "PUT",
        path: `api/cacdichvu/${id}`,
        data: {
            tuy_chon_dv: tuy_chon_dv,
            created_user: created_user,
            updated_user: updated_user
        }
    })

    return res
}

const deleteCDV = async (id) => {

    const res = await request({
        method: "DELETE",
        path: `api/cacdichvu/${id}`,
        data: null
    })

    return res
}

export { getCDV, getCDVById, addCDV, editCDV, deleteCDV }