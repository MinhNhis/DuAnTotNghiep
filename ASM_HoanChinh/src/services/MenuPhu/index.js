import request from "../../config/ApiConfig";

const getMenus = async () => {
    const res = await request({
        method: "GET",
        path: "/api/menu",
    });

    return res;
};

const getMenuById = async (id_menu) => {
    const res = await request({
        method: "GET",
        path: `/api/menu/${id_menu}`,
    });
    return res;
}
const addMenu = async ({ ten_menu, gia, hinh_anh, id_danhmuc, id_quanan, created_user }) => {
    const data = new FormData();
    data.append("ten_menu", ten_menu);
    data.append("gia", gia);
    data.append("id_danhmuc", id_danhmuc);
    data.append("id_quanan", id_quanan);
    data.append("created_user", created_user);
    // Gửi 1 ảnh
    data.append("hinh_anh", hinh_anh);

    // Gửi nhiều ảnh
    // data.append("image[0]", image);
    // data.append("image[1]", image);
    // data.append("image[3]", image);

    const res = await request({
        method: "POST",
        path: "api/menu",
        data: data,
    })

    return res;
};

const updateMenu = async (id_menu, { ten_menu, gia, hinh_anh, id_danhmuc, id_quanan, created_user, updated_user }) => {
    const data = new FormData();
    data.append("ten_menu", ten_menu);
    data.append("gia", gia);
    data.append("hinh_anh", hinh_anh);
    data.append("id_danhmuc", id_danhmuc);
    data.append("id_quanan", id_quanan);
    data.append("created_user", created_user);
    data.append("updated_user", updated_user);

    const res = await request({
        method: "PUT",
        path: `api/menu/${id_menu}`,
        data: data,
    });

    return res;
};

const deleteMenu = async (id_menu) => {
    const res = await request({
        method: "DELETE",
        path: `api/menu/${id_menu}`,
    });

    return res;
};

const paginator = async (page) => {
    const res = await request({
        method: "GET",
        path: `/api/paginator-menu?page=${page}&limit=12`
    })

    return res
}





export { getMenus, addMenu, updateMenu, deleteMenu, getMenuById, paginator };