import request from "../../config/ApiConfig";

const getDanhmuc = async () => {
    const res = await request({
        method: "GET",
        path: "/api/danhmuc",
    });

    return res;
};

const getDanhmucById = async (id_danhmuc) => {
    const res = await request({
        method: "GET",
        path: `/api/danhmuc/${id_danhmuc}`,
    });
    return res;
}
const addDanhmuc = async ({ danh_muc, created_user,id_alldanhmuc }) => {

    const res = await request({
        method: "POST",
        path: "api/danhmuc",
        data: {
            danh_muc: danh_muc,
            created_user: created_user,
            updated_user: null,
            id_alldanhmuc: id_alldanhmuc
        }
    })
    return res;
}

const updateDanhmuc = async (id_danhmuc, { danh_muc, created_user, updated_user,id_alldanhmuc }) => {
    const res = await request({
        method: "PUT",
        path: `api/danhmuc/${id_danhmuc}`,
        data: {
            danh_muc: danh_muc,
            created_user: created_user,
            updated_user: updated_user,
            id_alldanhmuc: id_alldanhmuc
        }
    })
    return res;

};

const deleteDanhmuc = async (id_danhmuc) => {
    const res = await request({
        method: "DELETE",
        path: `api/danhmuc/${id_danhmuc}`,
    });

    return res;
};



export { getDanhmuc, addDanhmuc, updateDanhmuc, deleteDanhmuc, getDanhmucById };