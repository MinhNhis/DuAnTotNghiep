import request from "../../config/ApiConfig";

const getMenuOrder = async () => {
    const res = await request({
        method: "GET",
        path: "/api/menuorder",
    });
    return res;
}

const getMenuOrderById = async (id) => {
    const res = await request({
        method: "GET",
        path: `/api/menuorder/${id}`,
    });
    return res;
}

const addMenuOrder = async ({ ten_mon, so_luong, gia, id_datcho }) => {
    const res = await request({
        method: "POST",
        path: "api/menuorder",
        data: {
            ten_mon: ten_mon,
            so_luong: so_luong,
            gia: gia,
            id_datcho: id_datcho
        },
    })
    return res;
};

export { getMenuOrder, getMenuOrderById, addMenuOrder }