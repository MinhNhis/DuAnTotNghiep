import request from "../../config/ApiConfig";

const getAllDanhmuc = async () => {
    const res = await request({
        method: "GET",
        path: "/api/alldanhmuc",
    });

    return res;
};

const getAllDanhmucById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/alldanhmuc/${id}`,
    });
    return res;
}
const addAllDanhmuc = async ({ ten_danhmuc, created_user, updated_user }) => {

    const res = await request({
        method: "POST",
        path: "api/alldanhmuc",
        data: {
            ten_danhmuc: ten_danhmuc,
            created_user: created_user,
            updated_user: updated_user,
        }
    })
    return res;
}

const updateAllDanhmuc = async (id, { ten_danhmuc, created_user, updated_user }) => {
    const res = await request({
        method: "PUT",
        path: `api/alldanhmuc/${id}`,
        data: {
            ten_danhmuc: ten_danhmuc,
            created_user: created_user,
            updated_user: updated_user,
        }
    })
    return res;

};

const deleteAllDanhmuc = async (id) => {
    const res = await request({
        method: "DELETE",
        path: `api/alldanhmuc/${id}`,
    });

    return res;
};



export { getAllDanhmuc, addAllDanhmuc, updateAllDanhmuc, deleteAllDanhmuc, getAllDanhmucById };